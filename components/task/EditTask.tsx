import { FC } from 'react'
import useEditTask from '../../common/hooks/task/useEditTask'
import { TaskWithProjectType } from '../../common/types/TaskType'
import TaskForm from './TaskForm'

type Props = {
  task: TaskWithProjectType
  onRequestClose: () => void
}

const EditTask: FC<Props> = ({ task, onRequestClose }) => {
  const { isSubmitting, onSubmit } = useEditTask(() => onRequestClose())

  return (
    <TaskForm
      id='edit'
      title='Edit Task'
      defaultValues={task}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      onRequestClose={onRequestClose}
    />
  )
}

export default EditTask
