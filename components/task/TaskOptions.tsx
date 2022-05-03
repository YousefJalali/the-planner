import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { useModal } from '../../common/contexts/ModalCtx'
import useCheckTask from '../../common/hooks/task/useCheckTask'
import useDeleteTask from '../../common/hooks/task/useDeleteTask'
import useUpdateTaskStatus from '../../common/hooks/task/useUpdateTaskStatus'
import { TaskWithProjectType } from '../../common/types/TaskType'
import Button from '../formElements/Button'
import EditTask from './EditTask'
import StatusList from './StatusList'
import TaskOptionsList from './TaskOptionsList'

type Props = {
  task: TaskWithProjectType
  callLocation: 'dateTasks' | 'projectId' | 'taskId'
  iconSize?: string
}

const TaskOptions: FC<Props> = ({
  task,
  callLocation,
  iconSize = '1.125rem',
}) => {
  const { setModal, clearModal } = useModal()

  //hooks
  const { checkTaskHandler } = useCheckTask()
  const { taskStatusHandler } = useUpdateTaskStatus(callLocation, () => {
    clearModal('task-status')
    clearModal('task-options')
  })

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

  const onEdit = () => {
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
      name='task options'
      variant='textOnly'
      color='information'
      onClick={onOptions}
      data-testid='taskItem-kebab'
      borderRadius='full'
    >
      <x.span fontSize={iconSize}>
        <FiMoreVertical />
      </x.span>
    </Button>
  )
}

export default TaskOptions
