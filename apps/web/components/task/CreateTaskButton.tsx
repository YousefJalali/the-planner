import { FC } from 'react'
import { useModal } from '@the-planner/hooks'
import { useCreateTask } from '@the-planner/data'
import { TaskType } from '@the-planner/types'
import { FloatingButton, ModalHeader } from '@the-planner/ui-web'
import { TaskForm } from './task-form'

const CreateTaskBtn: FC = () => {
  const { setModal, clearModal } = useModal()

  const showForm = (defValues?: Partial<TaskType>, serverErrors?: object) => {
    setModal({
      id: 'task-create',
      fullScreen: true,
      content: (
        <>
          <ModalHeader onRequestClose={() => clearModal('task-create')} p={3}>
            New Task
          </ModalHeader>
          <TaskForm
            id="create"
            defaultValues={defValues || defaultValues}
            onSubmit={onSubmit}
            serverErrors={serverErrors}
          />
        </>
      ),
    })
  }

  const { onSubmit, defaultValues } = useCreateTask(showForm, () =>
    clearModal('task-create')
  )

  return (
    <FloatingButton
      name="create task button"
      id="create-task-button"
      onClick={() => showForm()}
    />
  )
}

export default CreateTaskBtn
