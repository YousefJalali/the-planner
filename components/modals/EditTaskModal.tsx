import { FC, useContext } from 'react'
import ActiveTaskCtx from '../../common/contexts/ActiveTaskCtx'
import Modal from '../layout/Modal'
import EditTask from '../task/EditTask'

type Props = {
  isOpen: boolean
  onRequestClose: (action: string) => void
}

const EditTaskModal: FC<Props> = ({ isOpen, onRequestClose }) => {
  const { activeTask } = useContext(ActiveTaskCtx)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose('edit')}
      id='task-edit-modal'
    >
      {activeTask && (
        <EditTask
          onRequestClose={() => onRequestClose('edit')}
          task={activeTask}
        />
      )}
    </Modal>
  )
}

export default EditTaskModal
