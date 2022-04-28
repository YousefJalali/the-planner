import { FC } from 'react'
import useCreateTask from '../../common/hooks/task/useCreateTask'
import Modal from '../layout/Modal'
import TaskForm from '../task/TaskForm'

type Props = {
  isOpen: boolean
  onRequestClose: (action?: string) => void
}

const CreateTaskModal: FC<Props> = ({ isOpen, onRequestClose }) => {
  const { isSubmitting, onSubmit, defaultValues } =
    useCreateTask(onRequestClose)

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} fullHeight>
      <TaskForm
        id='create'
        title='New Task'
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        onRequestClose={onRequestClose}
      />
    </Modal>
  )
}

export default CreateTaskModal
