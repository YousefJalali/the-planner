import { useModal } from '@the-planner/hooks'
import { Task } from '@the-planner/types'
import TaskForm from './task-form'
import { useEditTask } from '@the-planner/data'

export default function EditTask({
  children,
  task,
}: {
  children: (handler: () => void) => JSX.Element
  task: Task
}) {
  const { setModal, clearModal } = useModal()

  const showTaskForm = (defValues?: Partial<Task>, serverErrors?: object) => {
    setModal({
      id: 'task-edit',
      closeButton: true,
      content: (
        <>
          <TaskForm
            id="edit"
            defaultValues={defValues || task}
            onSubmit={onSubmit}
            serverErrors={serverErrors}
          />
        </>
      ),
    })
  }

  const { onSubmit } = useEditTask(showTaskForm, () => {
    clearModal('task-edit')
    clearModal('task-options')
  })

  const editHandler = () => {
    clearModal('task-options')
    showTaskForm()
  }

  return children(editHandler)
}
