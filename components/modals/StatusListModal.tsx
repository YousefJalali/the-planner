import { FC, useContext } from 'react'
import ActiveTaskCtx from '../../common/contexts/ActiveTaskCtx'
import { Status } from '../../common/types/TaskType'
import Modal from '../layout/Modal'
import StatusList from '../task/StatusList'

type Props = {
  isOpen: boolean
  onRequestClose: (action: string) => void
  onStatusChange: (id: string, status: Status) => void
}

const StatusListModal: FC<Props> = ({
  isOpen,
  onRequestClose,
  onStatusChange,
}) => {
  const { activeTask } = useContext(ActiveTaskCtx)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      id='task-status-modal'
    >
      {activeTask && (
        <StatusList
          status={activeTask.status}
          onChange={(status) => onStatusChange(activeTask.id, status)}
        />
      )}
    </Modal>
  )
}

export default StatusListModal
