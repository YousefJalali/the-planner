import { FC, useContext } from 'react'
import Modal from '../layout/Modal'
import CreateTask from '../task/CreateTask'

type Props = {
  isOpen: boolean
  onRequestClose: (action: string) => void
}

const CreateTaskModal: FC<Props> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <CreateTask onRequestClose={onRequestClose} />
    </Modal>
  )
}

export default CreateTaskModal
