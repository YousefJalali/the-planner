import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { useModal } from '../../common/contexts/ModalCtx'
import useDeleteTask from '../../common/hooks/task/useDeleteTask'
import useEditTask from '../../common/hooks/task/useEditTask'
import useUpdateTaskStatus from '../../common/hooks/task/useUpdateTaskStatus'
import { TaskType, TaskWithProjectType } from '../../common/types/TaskType'
import Button from '../formElements/Button'
import StatusList from './StatusList'
import TaskForm from './TaskForm'
import TaskOptionsList from './TaskOptionsList'

type Props = {
  task: TaskWithProjectType
  inHeader?: boolean
}

const TaskOptions: FC<Props> = ({ task, inHeader }) => {
  const { setModal, clearModal } = useModal()

  const showTaskForm = (
    defValues?: Partial<TaskType>,
    serverErrors?: object
  ) => {
    setModal({
      id: 'task-edit',
      fullScreen: true,
      content: (
        <TaskForm
          id='edit'
          title='Edit Task'
          defaultValues={defValues || task}
          onSubmit={onSubmit}
          serverErrors={serverErrors}
          onRequestClose={() => {
            clearModal('task-edit')
            clearModal('task-options')
          }}
        />
      ),
    })
  }

  const { onSubmit } = useEditTask(showTaskForm, () => {
    clearModal('task-edit')
    clearModal('task-options')
  })
  const { deleteTaskHandler } = useDeleteTask(() => clearModal('task-options'))
  const { taskStatusHandler } = useUpdateTaskStatus(() => {
    clearModal('task-status')
    clearModal('task-options')
  })

  const onOptions = () => {
    setModal({
      id: 'task-options',
      content: (
        <TaskOptionsList
          status={task.status}
          onStatusChange={onStatus}
          onEdit={onEdit}
          onDelete={() => deleteTaskHandler(task.id)}
        />
      ),
    })
  }

  const onStatus = () => {
    clearModal('task-options')

    setModal({
      id: 'task-status',
      content: (
        <StatusList
          status={task.status}
          onChange={(newStatus) =>
            taskStatusHandler({ taskId: task.id, newStatus })
          }
        />
      ),
    })
  }

  const onEdit = () => {
    clearModal('task-options')
    showTaskForm()
  }

  return (
    <Button
      data-testid='taskItem-kebab'
      name='task options'
      onClick={onOptions}
      variant='outline'
      borderRadius='full'
      mr={inHeader ? 4 : 0}
      borderColor={inHeader ? 'layout-level0accent' : 'transparent'}
      p={inHeader ? 1 : 0}
    >
      <x.span
        fontSize={inHeader ? '1.5rem' : '1.125rem'}
        color={inHeader ? 'content-contrast' : 'content-default'}
      >
        <FiMoreVertical />
      </x.span>
    </Button>
  )
}

export default TaskOptions
