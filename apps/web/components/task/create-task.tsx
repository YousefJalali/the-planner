import { useCallback } from 'react'
import { useModal } from '@the-planner/hooks'
import { useCreateTask } from '@the-planner/data'
import { Status, Task } from '@the-planner/types'
import { TaskForm } from './task-form'
import { parseUrlDate } from '@the-planner/utils'
import { useRouter } from 'next/router'
import { FiPlus } from 'react-icons/fi'

export default function CreateTask({
  date,
  status,
}: {
  date?: string
  status?: Status
}) {
  const router = useRouter()

  const urlDate =
    typeof router.query.d === 'string' ? String(router.query.d) : null

  const currentDate = urlDate || date

  const { setModal, clearModal } = useModal()

  const { onSubmit, isMutating } = useCreateTask()

  const showModal = useCallback(
    () =>
      setModal({
        id: 'task-create',
        closeButton: true,
        content: (
          <TaskForm
            id="create"
            defaultValues={{
              ...(currentDate && {
                startDate: parseUrlDate(currentDate as string),
              }),
              ...(status && {
                status,
              }),
            }}
            onSubmit={(formData) =>
              onSubmit(formData, () => clearModal('task-create'))
            }
            isSubmitting={isMutating}
            // serverErrors={serverErrors}
          />
        ),
      }),
    []
  )

  return (
    <>
      <button
        name="create task button"
        id="create-task-button"
        onClick={showModal}
        className="fixed bottom-6 right-6 z-40 btn btn-circle btn-primary shadow-xl lg:hidden"
      >
        <FiPlus size={24} />
      </button>

      <button
        name="create task button"
        id="create-task-button"
        onClick={showModal}
        className="hidden lg:flex btn btn-primary gap-2"
      >
        <FiPlus size={24} />
        <span className="hidden lg:inline">Create task</span>
      </button>
    </>
  )
}
