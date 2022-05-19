import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { useModal } from '../../common/contexts/ModalCtx'
import useDeleteTask from '../../common/hooks/task/useDeleteTask'
import { Status, TaskWithProjectType } from '../../common/types/TaskType'
import Button from '../formElements/Button'
import EditTask from './EditTask'
import StatusList from './StatusList'
import TaskOptionsList from './TaskOptionsList'

type Props = {
  task: TaskWithProjectType
  inHeader?: boolean
  onChangeStatus: (task: TaskWithProjectType, newStatus: Status) => void
}

const TaskOptions: FC<Props> = ({ task, inHeader, onChangeStatus }) => {
  const { setModal, clearModal } = useModal()

  const { deleteTaskHandler } = useDeleteTask(() => clearModal('task-options'))

  const onOptions = () => {
    setModal({
      id: 'task-options',
      content: (
        <TaskOptionsList
          status={task.status}
          onStatusChange={onStatus}
          onEdit={onEdit}
          onDelete={() => deleteTaskHandler(task)}
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
          onChange={(newStatus) => onChangeStatus(task, newStatus)}
        />
      ),
    })
  }

  const onEdit = () => {
    clearModal('task-options')

    setModal({
      id: 'task-edit',
      fullScreen: true,
      content: (
        <EditTask
          task={task}
          onRequestClose={() => {
            clearModal('task-edit')
            clearModal('task-options')
          }}
        />
      ),
    })
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
