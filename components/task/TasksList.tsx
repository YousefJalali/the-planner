import { FC } from 'react'
import { x } from '@xstyled/styled-components'
import dynamic from 'next/dynamic'

import { TaskWithProjectType } from '../../common/types/TaskType'

import TaskItem from './TaskItem'

import { useActiveTask } from '../../common/contexts/ActiveTaskCtx'
import useToggle from '../../common/hooks/useToggle'
import useUpdateTaskStatus from '../../common/hooks/task/useUpdateTaskStatus'
import useDeleteTask from '../../common/hooks/task/useDeleteTask'
import useCheckTask from '../../common/hooks/task/useCheckTask'

const TaskOptionsModal = dynamic(() => import('../modals/TaskOptionsModal'))
const StatusListModal = dynamic(() => import('../modals/StatusListModal'))
const EditTaskModal = dynamic(() => import('../modals/EditTaskModal'))
const TaskDetailsModal = dynamic(() => import('../modals/TaskDetailsModal'))

type Props = {
  tasks: TaskWithProjectType[]
  id?: string
}

const TasksList: FC<Props> = ({ tasks, id }) => {
  //context
  const { activeTask, clearActiveTask } = useActiveTask()

  //toggle modals
  const [detailsModal, setDetailsModal] = useToggle()
  const [statusModal, setStatusModal] = useToggle()
  const [editTaskModal, setEditTaskModal] = useToggle()
  const [optionsModal, setOptionsModal] = useToggle()

  //hooks
  const { checkTaskHandler } = useCheckTask()
  const { taskStatusHandler } = useUpdateTaskStatus(() => {
    setStatusModal(false)
    setOptionsModal(false)
  })
  const { deleteTaskHandler } = useDeleteTask(activeTask, setOptionsModal)

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

  return (
    <>
      <x.ul spaceY={3} id={id} data-testid={id}>
        {tasks.map((task) => (
          <x.li key={task.id}>
            <TaskItem
              task={task}
              onCheck={checkTaskHandler}
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
        onStatusChange={taskStatusHandler}
      />
    </>
  )
}

export default TasksList
