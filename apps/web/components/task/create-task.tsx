import { useState } from 'react'
import { useCreateTask } from '@the-planner/data'
import { TaskForm } from './task-form'
import { parseUrlDate } from '@the-planner/utils'
import { useRouter } from 'next/router'
import { FiPlus } from 'react-icons/fi'
import { Modal } from '../ui'
import ProtectedComponent from '../auth/ProtectedComp'

export default function CreateTask({
  children,
  projectId,
}: {
  children?: (handler: () => void) => JSX.Element
  projectId?: string
}) {
  const [modal, showModal] = useState(false)

  const router = useRouter()

  const urlDate =
    typeof router.query.d === 'string' ? String(router.query.d) : undefined

  const { onSubmit, isMutating } = useCreateTask({
    projectId,
    date: urlDate,
  })

  return (
    <>
      {children ? (
        children(() => showModal(true))
      ) : (
        <>
          <button
            name="create task button"
            id="create-task-button"
            onClick={() => showModal(true)}
            className="fixed bottom-6 right-6 z-40 btn btn-circle btn-primary shadow-xl lg:hidden"
          >
            <FiPlus size={24} />
          </button>

          <button
            name="create task button"
            id="create-task-button"
            onClick={() => showModal(true)}
            className="hidden lg:flex btn btn-primary gap-2"
          >
            <FiPlus size={24} />
            <span className="hidden lg:inline">new task</span>
          </button>
        </>
      )}

      <Modal
        id="task-create"
        isOpen={modal}
        dismiss={() => showModal(false)}
        closeButton
      >
        <ProtectedComponent
          title="Create Task"
          description="To create a new task, you need to have an account. Please log in
          or sign up to start creating your personal tasks."
        >
          <TaskForm
            id="create"
            defaultValues={{
              ...(urlDate && {
                startDate: parseUrlDate(urlDate as string),
              }),
              ...(projectId && {
                projectId,
              }),
            }}
            onSubmit={(formData) => onSubmit(formData, () => showModal(false))}
            isSubmitting={isMutating}
            // serverErrors={serverErrors}
          />
        </ProtectedComponent>
      </Modal>
    </>
  )
}
