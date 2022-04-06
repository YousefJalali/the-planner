import { FC, useContext } from 'react'
import ActiveTaskCtx from '../../common/contexts/ActiveTaskCtx'
import Modal from '../layout/Modal'
import TaskOptions from '../task/TaskOptions'

type Props = {
  isOpen: boolean
  onRequestClose: (action: string) => void
  onStatusChange: () => void
  onEdit: () => void
  onDelete: () => void
}

const TaskOptionsModal: FC<Props> = ({
  isOpen,
  onRequestClose,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  const { activeTask } = useContext(ActiveTaskCtx)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose('options')}
      id='task-options-modal'
    >
      {activeTask && (
        <TaskOptions
          onStatusChange={onStatusChange}
          onEdit={onEdit}
          onDelete={onDelete}
          status={activeTask.status}
        />
      )}
    </Modal>
  )
}

export default TaskOptionsModal
