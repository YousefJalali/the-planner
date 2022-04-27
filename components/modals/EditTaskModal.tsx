import { FC } from 'react'
import useEditTask from '../../common/hooks/useEditTask'
import { TaskWithProjectType } from '../../common/types/TaskType'
import Modal from '../layout/Modal'
import TaskForm from '../task/TaskForm'

type Props = {
  isOpen: boolean
  onRequestClose: (action: string) => void
  task: TaskWithProjectType | null
}

const EditTaskModal: FC<Props> = ({ isOpen, onRequestClose, task }) => {
  const onCloseModal = () => onRequestClose('edit')

  const { isSubmitting, onSubmit } = useEditTask(onCloseModal)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose('edit')}
      id='task-edit-modal'
      fullHeight
    >
      {task && (
        <TaskForm
          id='edit'
          title='Edit Task'
          defaultValues={task}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onRequestClose={onCloseModal}
        />
      )}
    </Modal>
  )
}

export default EditTaskModal
