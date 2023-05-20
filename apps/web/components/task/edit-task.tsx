import { Task } from '@the-planner/types'
import TaskForm from './task-form'
import { useEditTask } from '@the-planner/data'
import { useState } from 'react'
import { Modal } from '../ui'

export default function EditTask({
  children,
  task,
}: {
  children: (handler: () => void) => JSX.Element
  task: Task
}) {
  const [modal, showModal] = useState(false)

  const { onSubmit } = useEditTask({ taskId: task.id })

  return (
    <>
      {children(() => showModal(true))}

      <Modal
        id="task-edit"
        isOpen={modal}
        dismiss={() => showModal(false)}
        closeButton
      >
        <TaskForm
          id="edit"
          defaultValues={task}
          onSubmit={(formData) =>
            onSubmit(formData, () => {
              showModal(false)
              // clearModal('task-options')
            })
          }
          // serverErrors={serverErrors}
        />
      </Modal>
    </>
  )
}
