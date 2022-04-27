import { FC } from 'react'
import { TaskWithProjectType } from '../../common/types/TaskType'
import Modal from '../layout/Modal'
import TaskOptions from '../task/TaskOptions'

type Props = {
  isOpen: boolean
  onRequestClose: (action: string) => void
  task: TaskWithProjectType | null
  onStatusChange: () => void
  onEdit: () => void
  onDelete: () => void
}

const TaskOptionsModal: FC<Props> = ({
  isOpen,
  onRequestClose,
  task,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose('options')}
      id='task-options-modal'
    >
      {task && (
        <TaskOptions
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
          status={task.status}
        />
      )}
    </Modal>
  )
}

export default TaskOptionsModal
