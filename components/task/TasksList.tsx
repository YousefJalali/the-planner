import { FC } from 'react'
import { x } from '@xstyled/styled-components'

import { TaskWithProjectType } from '../../common/types/TaskType'

import TaskItem from './TaskItem'

import useUpdateTaskStatus from '../../common/hooks/task/useUpdateTaskStatus'
import useDeleteTask from '../../common/hooks/task/useDeleteTask'
import useCheckTask from '../../common/hooks/task/useCheckTask'
import { useModal } from '../../common/contexts/ModalCtx'
import TaskDetails from './TaskDetails'
import TaskOptions from './TaskOptions'
import StatusList from './StatusList'
import TaskForm from './TaskForm'
import useEditTask from '../../common/hooks/task/useEditTask'

type Props = {
  tasks: TaskWithProjectType[]
  id?: string
}

const TasksList: FC<Props> = ({ tasks, id }) => {
  const { setModal, clearModal } = useModal()
  //hooks
  const { checkTaskHandler } = useCheckTask()
  const { taskStatusHandler } = useUpdateTaskStatus(() => {
    clearModal('task-status')
    clearModal('task-options')
  })
  const { deleteTaskHandler } = useDeleteTask(() => clearModal('task-options'))

  const { isSubmitting, onSubmit } = useEditTask(() => clearModal('task-edit'))

  const onDetails = (task: TaskWithProjectType) => {
    setModal({
      id: 'task-details',
      content: (
        <TaskDetails task={task} onClose={() => clearModal('task-details')} />
      ),
    })
  }

  const onOptions = (task: TaskWithProjectType) => {
    setModal({
      id: 'task-options',
      content: (
        <TaskOptions
          status={task.status}
          onStatusChange={() => onStatus(task)}
          onEdit={() => onEdit(task)}
          onDelete={() => deleteTaskHandler(task)}
        />
      ),
    })
  }

  const onStatus = (task: TaskWithProjectType) => {
    setModal({
      id: 'task-status',
      content: (
        <StatusList
          status={task.status}
          onChange={(newStatus) => taskStatusHandler(task, newStatus)}
        />
      ),
    })
  }

  const onEdit = (task: TaskWithProjectType) => {
    setModal({
      id: 'task-edit',
      fullScreen: true,
      content: (
        <TaskForm
          id='edit'
          title='Edit Task'
          defaultValues={task}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onRequestClose={() => clearModal('task-edit')}
        />
      ),
    })
  }

  return (
    <x.ul spaceY={3} id={id} data-testid={id}>
      {tasks.map((task) => (
        <x.li key={task.id}>
          <TaskItem
            task={task}
            onCheck={checkTaskHandler}
            onDetails={() => onDetails(task)}
            onOptions={() => onOptions(task)}
          />
        </x.li>
      ))}
    </x.ul>
  )
}

export default TasksList
