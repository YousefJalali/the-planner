import { FC } from 'react'
import { Status, TaskWithProjectType } from '../../common/types/TaskType'
import Modal from '../layout/Modal'
import StatusList from '../task/StatusList'

type Props = {
  isOpen: boolean
  onRequestClose: (action: string) => void
  onStatusChange: (task: TaskWithProjectType, status: Status) => void
  task: TaskWithProjectType | null
}

const StatusListModal: FC<Props> = ({
  isOpen,
  onRequestClose,
  task,
  onStatusChange,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      id='task-status-modal'
    >
      {task && (
        <StatusList
          status={task.status}
          onChange={(status) => onStatusChange(task, status)}
        />
      )}
    </Modal>
  )
}

export default StatusListModal
