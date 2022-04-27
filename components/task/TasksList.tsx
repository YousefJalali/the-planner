import { FC } from 'react'
import { x } from '@xstyled/styled-components'
import _, { uniqueId } from 'lodash'
import dynamic from 'next/dynamic'

import { Status, TaskWithProjectType } from '../../common/types/TaskType'
import { ProjectType } from '../../common/types/ProjectType'

import TaskItem from './TaskItem'
import { changeTaskStatus, deleteTask } from '../../common/actions/taskActions'
import {
  removeTaskFromLocalTasksData,
  updateTaskStatusInLocalTasksData,
} from '../../common/data/localData/localTasksData'
import {
  removeTaskFromLocalProjectData,
  updateTaskStatusInLocalProject,
} from '../../common/data/localData/localProjectsData'

import { useActiveTask } from '../../common/contexts/ActiveTaskCtx'
import { useNotification } from '../../common/contexts/NotificationCtx'
import useToggle from '../../common/hooks/useToggle'
import { useSWRConfig } from 'swr'

const TaskOptionsModal = dynamic(() => import('../modals/TaskOptionsModal'))
const StatusListModal = dynamic(() => import('../modals/StatusListModal'))
const EditTaskModal = dynamic(() => import('../modals/EditTaskModal'))
const TaskDetailsModal = dynamic(() => import('../modals/TaskDetailsModal'))

type Props = {
  tasks: TaskWithProjectType[]
  id?: string
}

const TasksList: FC<Props> = ({ tasks, id }) => {
  // console.log('TasksList rendered')

  const { mutate } = useSWRConfig()

  //context
  const { activeTask, clearActiveTask } = useActiveTask()
  const { setNotification } = useNotification()

  //toggle modals
  const [detailsModal, setDetailsModal] = useToggle()
  const [statusModal, setStatusModal] = useToggle()
  const [editTaskModal, setEditTaskModal] = useToggle()
  const [optionsModal, setOptionsModal] = useToggle()

  //modal handler
  const closeModalHandler = (modal: string) => {
    switch (modal) {
      case 'details':
        setDetailsModal(false)
        clearActiveTask()
        return

      case 'edit':
        setEditTaskModal(false)
        setOptionsModal(false)
        clearActiveTask()
        return

      case 'options':
        setOptionsModal(false)
        clearActiveTask()
        return

      default:
        return
    }
  }

  // console.log(router)

  const onTaskDetailsHandler = () => {
    setDetailsModal()
  }

  const deleteTaskHandler = async () => {
    if (!activeTask) return

    // mutate tasks locally
    mutate(
      `/tasks/${new Date(activeTask.startDate).toDateString()}`,
      (data: { data: TaskWithProjectType[] }) =>
        data && removeTaskFromLocalTasksData(data.data, activeTask.id),
      false
    )

    //mutate project locally
    mutate(
      `/projects/${activeTask.projectId}`,
      (data: { data: ProjectType }) =>
        data && removeTaskFromLocalProjectData(data.data, activeTask.id),
      false
    )

    const request = async () => {
      console.log('request executed')
      //send request
      const { error } = await deleteTask(activeTask.id)

      setOptionsModal(false)
      mutate(`/tasks/${new Date(activeTask.startDate).toDateString()}`)
      mutate(`/projects/${activeTask.projectId}`)

      if (error) {
        setNotification({
          id: uniqueId(),
          message: error,
          variant: 'critical',
          action: 'try again',
          actionFn: async () => {
            setNotification({
              id: uniqueId(),
              message: 'deleting...',
              variant: 'critical',
              loading: true,
            })
            setTimeout(async () => {
              await request()
            }, 3000)
          },
        })
      } else {
        setNotification({
          id: uniqueId(),
          message: 'task deleted!',
          variant: 'confirmation',
        })
      }
    }

    await request()
  }

  const changeStatusHandler = async (
    task: TaskWithProjectType,
    status: Status
  ) => {
    // mutate tasks locally
    mutate(
      `/tasks/${new Date(task.startDate).toDateString()}`,
      (data: { data: TaskWithProjectType[] }) =>
        data && updateTaskStatusInLocalTasksData(data.data, task.id, status),
      false
    )

    //mutate project locally
    mutate(
      `/projects/${task.projectId}`,
      (data: { data: ProjectType }) =>
        data && updateTaskStatusInLocalProject(data.data, task.id, status),
      false
    )

    const { data, error } = await changeTaskStatus(task.id, status)

    mutate(`/tasks/${new Date(task.startDate).toDateString()}`)
    mutate(`/projects/${task.projectId}`)

    setStatusModal(false)
    setOptionsModal(false)

    if (error) {
      setNotification({
        id: uniqueId(),
        message: error,
        variant: 'critical',
      })
    }
  }

  const onCheckHandler = (task: TaskWithProjectType) => {
    const s =
      task.status === Status.PROPOSED || task.status === Status.INPROGRESS
        ? Status.COMPLETED
        : Status.PROPOSED

    changeStatusHandler(task, s)
  }

  return (
    <>
      <x.ul spaceY={3} id={id} data-testid={id}>
        {tasks.map((task) => (
          <x.li key={task.id}>
            <TaskItem
              task={task}
              onCheck={onCheckHandler}
              onDetails={onTaskDetailsHandler}
              onOptions={setOptionsModal}
            />
          </x.li>
        ))}
      </x.ul>

      {/* task details */}
      <TaskDetailsModal
        isOpen={detailsModal}
        onRequestClose={() => closeModalHandler('details')}
        task={activeTask}
      />

      {/* edit task modal */}
      <EditTaskModal
        isOpen={editTaskModal}
        onRequestClose={() => closeModalHandler('edit')}
        task={activeTask}
      />

      {/* task options modal */}
      <TaskOptionsModal
        isOpen={optionsModal}
        onRequestClose={() => closeModalHandler('options')}
        task={activeTask}
        onStatusChange={setStatusModal}
        onEdit={setEditTaskModal}
        onDelete={deleteTaskHandler}
      />

      {/* status list modal */}
      <StatusListModal
        isOpen={statusModal}
        onRequestClose={setStatusModal}
        task={activeTask}
        onStatusChange={changeStatusHandler}
      />
    </>
  )
}

export default TasksList
