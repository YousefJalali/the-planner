import { FC, useContext } from 'react'
import ActiveTaskCtx from '../../common/contexts/ActiveTaskCtx'
import Modal from '../layout/Modal'
import TaskDetails from '../task/TaskDetails'

type Props = {
  isOpen: boolean
  onRequestClose: (action: string) => void
}

const TaskDetailsModal: FC<Props> = ({ isOpen, onRequestClose }) => {
  const { activeTask } = useContext(ActiveTaskCtx)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose('details')}
      id='task-details-modal'
    >
      {activeTask && (
        <TaskDetails
          task={activeTask}
          onClose={() => onRequestClose('details')}
        />
      )}
    </Modal>
  )
}

export default TaskDetailsModal
