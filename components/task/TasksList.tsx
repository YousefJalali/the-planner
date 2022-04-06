import { FC, useContext } from 'react'
import { x } from '@xstyled/styled-components'
import { Status, TaskProjectType, TaskType } from '../../common/types/TaskType'
import TaskItem from './TaskItem'
import _ from 'lodash'
import { changeTaskStatus, deleteTask } from '../../common/actions/taskActions'
import useToggle from '../../common/hooks/useToggle'
import ActiveTaskCtx from '../../common/contexts/ActiveTaskCtx'
import NotificationCtx from '../../common/contexts/NotificationCtx'
import dynamic from 'next/dynamic'
import { removeTaskFromLocalTasksData } from '../../common/data/localData/localTasksData'
import { removeTaskFromLocalProjectData } from '../../common/data/localData/localProjectsData'

import { useSWRConfig } from 'swr'
import { ProjectType } from '../../common/types/ProjectType'

const TaskOptionsModal = dynamic(() => import('../modals/TaskOptionsModal'))
const StatusListModal = dynamic(() => import('../modals/StatusListModal'))
const EditTaskModal = dynamic(() => import('../modals/EditTaskModal'))
const TaskDetailsModal = dynamic(() => import('../modals/TaskDetailsModal'))

type Props = {
  tasks: TaskType[]
  id?: string
}

const TasksList: FC<Props> = ({ tasks, id }) => {
  // console.log('TasksList rendered')

  const { mutate } = useSWRConfig()

  //context
  const { activeTask, clearActiveTask } = useContext(ActiveTaskCtx)
  const { setNotification } = useContext(NotificationCtx)

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
        return setEditTaskModal(false)

      case 'options':
        setOptionsModal(false)
        clearActiveTask()
        return

      default:
        return
    }
  }

  const fn = () => console.log('hola')

  //actions
  const deleteTaskHandler = async () => {
    if (!activeTask) return

    // mutate tasks locally
    mutate(
      `/tasks/${new Date(activeTask.date.startDate).toDateString()}`,
      (data: TaskType[]) =>
        data && removeTaskFromLocalTasksData(data, activeTask.id),
      false
    )

    //mutate project locally
    mutate(
      `/projects/${(activeTask.project as TaskProjectType).id}`,
      (data: ProjectType) =>
        data && removeTaskFromLocalProjectData(data, activeTask.id),
      false
    )

    const testId = activeTask.id

    const request = async (id: string) => {
      console.log('request executed')
      //send request
      const { error } = await deleteTask(id)

      setOptionsModal(false)
      mutate(`/tasks/${new Date(activeTask.date.startDate).toDateString()}`)
      mutate(`/projects/${(activeTask.project as TaskProjectType).id}`)

      if (error) {
        setNotification({
          id: 'delete-task',
          message: error,
          variant: 'critical',
          action: 'try again',
          actionFn: async () => {
            setNotification({
              message: 'Deleting...',
              variant: 'critical',
              loading: true,
            })
            setTimeout(async () => {
              await request(testId)
            }, 3000)
          },
        })
      } else {
        setNotification({
          message: 'Task deleted!',
          variant: 'information',
        })
      }
    }

    await request('98')
  }

  const changeStatusHandler = (taskId: string, status: Status) => {
    // setDateTasks((data) => {
    //   console.log(data)
    //   return (
    //     data && [
    //       ...data.map((t) =>
    //         t.id === task.id
    //           ? {
    //               ...t,
    //               status:
    //                 t.status === Status.COMPLETED
    //                   ? Status.PROPOSED
    //                   : Status.COMPLETED,
    //             }
    //           : t
    //       ),
    //     ]
    //   )
    // }, false)

    changeTaskStatus(taskId, status, () => {
      setStatusModal(false)
      setOptionsModal(false)
      clearActiveTask()
      // setDateTasks()
      // setProject()
    })
  }

  const onCheckHandler = (taskId: string, status: Status) => {
    const s =
      status === Status.PROPOSED || status === Status.INPROGRESS
        ? Status.COMPLETED
        : Status.PROPOSED

    changeStatusHandler(taskId, s)
  }

  return (
    <>
      <x.ul spaceY={3} id={id} data-testid={id}>
        {tasks.map((task) => (
          <x.li key={task.id}>
            <TaskItem
              task={task}
              onCheck={onCheckHandler}
              onDetails={setDetailsModal}
              onOptions={setOptionsModal}
            />
          </x.li>
        ))}
      </x.ul>

      {/* task details */}
      <TaskDetailsModal
        isOpen={detailsModal}
        onRequestClose={() => closeModalHandler('details')}
      />

      {/* edit task modal */}
      <EditTaskModal
        isOpen={editTaskModal}
        onRequestClose={() => closeModalHandler('edit')}
      />

      {/* task options modal */}
      <TaskOptionsModal
        isOpen={optionsModal}
        onRequestClose={() => closeModalHandler('options')}
        onStatusChange={setStatusModal}
        onEdit={setEditTaskModal}
        onDelete={deleteTaskHandler}
      />

      {/* status list modal */}
      <StatusListModal
        isOpen={statusModal}
        onRequestClose={setStatusModal}
        onStatusChange={changeStatusHandler}
      />
    </>
  )
}

export default TasksList
