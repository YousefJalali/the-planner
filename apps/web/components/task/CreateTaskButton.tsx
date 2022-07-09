import { FC } from 'react'
import { useModal } from '@the-planner/hooks'
import { useCreateTask } from '@the-planner/data'
import { TaskType } from '@the-planner/types'
import { FloatingButton } from '@the-planner/ui-web'
import TaskForm from './TaskForm'

const CreateTaskBtn: FC = () => {
  const { setModal, clearModal } = useModal()

  const showForm = (defValues?: Partial<TaskType>, serverErrors?: object) => {
    setModal({
      id: 'task-create',
      fullScreen: true,
      content: (
        <TaskForm
          id="create"
          title="New Task"
          defaultValues={defValues || defaultValues}
          onSubmit={onSubmit}
          serverErrors={serverErrors}
          onRequestClose={() => clearModal('task-create')}
        />
      ),
    })
  }

  const { onSubmit, defaultValues } = useCreateTask(showForm, () =>
    clearModal('task-create')
  )

  return (
    <FloatingButton
      name="create task button"
      id="create-task-fb"
      onClick={() => showForm()}
    />
  )
}

export default CreateTaskBtn
