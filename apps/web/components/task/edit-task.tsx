import { useModal } from '@the-planner/hooks'
import { Task } from '@the-planner/types'
import TaskForm from './task-form'
import { useEditTask } from '@the-planner/data'
import { useCallback } from 'react'

export default function EditTask({
  children,
  task,
}: {
  children: (handler: () => void) => JSX.Element
  task: Task
}) {
  const { setModal, clearModal } = useModal()

  const { onSubmit } = useEditTask({ taskId: task.id })

  const showModal = useCallback(
    () =>
      setModal({
        id: 'task-edit',
        closeButton: true,
        content: (
          <TaskForm
            id="edit"
            defaultValues={task}
            onSubmit={(formData) =>
              onSubmit(formData, () => {
                clearModal('task-edit')
                clearModal('task-options')
              })
            }
            // serverErrors={serverErrors}
          />
        ),
      }),
    [task]
  )

  return children(showModal)
}
