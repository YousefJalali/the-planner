import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { useModal } from '@the-planner/hooks'
import {
  useDeleteTask,
  useEditTask,
  useUpdateTaskStatus,
} from '@the-planner/data'
import { TaskType, TaskWithProjectType } from '@the-planner/types'
import { Button, ModalHeader } from '@the-planner/ui-web'
import StatusList from '../StatusList'
import { TaskForm } from '../task-form'
import TaskOptionsList from './task-options-list'

type Props = {
  task: TaskWithProjectType
  inHeader?: boolean
}

const TaskOptionsKebab: FC<Props> = ({ task, inHeader }) => {
  const { setModal, clearModal } = useModal()

  const showTaskForm = (
    defValues?: Partial<TaskType>,
    serverErrors?: object
  ) => {
    setModal({
      id: 'task-edit',
      fullScreen: true,
      content: (
        <>
          <ModalHeader
            onRequestClose={() => {
              clearModal('task-edit')
              clearModal('task-options')
            }}
            p={3}
          >
            Edit Task
          </ModalHeader>
          <TaskForm
            id="edit"
            defaultValues={defValues || task}
            onSubmit={onSubmit}
            serverErrors={serverErrors}
          />
        </>
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
      data-testid="taskItem-kebab"
      name="task options"
      onClick={onOptions}
      variant="outline"
      borderRadius="full"
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

export default TaskOptionsKebab
