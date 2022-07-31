import { useDeleteTask } from '@the-planner/data'
import { useModal } from '@the-planner/hooks'
import { FiTrash2 } from 'react-icons/fi'
import TaskOption from './task-option-item'

type Props = {
  taskId: string
}

const DeleteTaskOption = ({ taskId }: Props) => {
  const { clearModal } = useModal()
  const { deleteTaskHandler } = useDeleteTask(() => clearModal('task-options'))

  return (
    <TaskOption
      data-testid="delete-task-option"
      onClick={() => deleteTaskHandler(taskId)}
      icon={<FiTrash2 />}
      content="Delete task"
      color="utility-critical"
    />
  )
}

export default DeleteTaskOption
