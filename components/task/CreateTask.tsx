import { FC } from 'react'
import useCreateTask from '../../common/hooks/task/useCreateTask'
import TaskForm from './TaskForm'

type Props = {
  onRequestClose: () => void
}

const CreateTask: FC<Props> = ({ onRequestClose }) => {
  const { isSubmitting, onSubmit, defaultValues } = useCreateTask(() =>
    onRequestClose()
  )

  return (
    <TaskForm
      id='create'
      title='New Task'
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      onRequestClose={onRequestClose}
    />
  )
}

export default CreateTask
