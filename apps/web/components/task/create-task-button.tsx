import { FC } from 'react'
import { useModal } from '@the-planner/hooks'
import { useCreateTask } from '@the-planner/data'
import { Status, Task } from '@the-planner/types'
import { TaskForm } from './task-form'
import { parseUrlDate } from '@the-planner/utils'
import { useRouter } from 'next/router'
import { FiPlus } from 'react-icons/fi'

type Props = {
  date?: string
  status?: Status
}

const CreateTaskButton: FC<Props> = ({ date, status }) => {
  const router = useRouter()

  const urlDate =
    typeof router.query.d === 'string' ? String(router.query.d) : null

  const currentDate = urlDate || date

  const { setModal, clearModal } = useModal()

  const showForm = (defValues?: Partial<Task>, serverErrors?: object) => {
    setModal({
      id: 'task-create',
      closeButton: true,
      content: (
        <>
          <TaskForm
            id="create"
            defaultValues={
              defValues || {
                ...(currentDate && {
                  startDate: parseUrlDate(currentDate as string),
                }),
                ...(status && {
                  status,
                }),
                ...defaultValues,
              }
            }
            onSubmit={onSubmit}
            serverErrors={serverErrors}
          />
        </>
      ),
    })
  }

  const { onSubmit, defaultValues } = useCreateTask(
    currentDate || new Date().toDateString(),
    showForm,
    () => clearModal('task-create')
  )

  return (
    <>
      <button
        name="create task button"
        id="create-task-button"
        onClick={() => showForm()}
        className="fixed bottom-6 right-6 z-40 btn btn-circle btn-primary shadow-xl lg:hidden"
      >
        <FiPlus size={24} />
      </button>

      <button
        name="create task button"
        id="create-task-button"
        onClick={() => showForm()}
        className="hidden lg:flex btn btn-primary gap-2"
      >
        <FiPlus size={24} />
        <span className="hidden lg:inline">Create task</span>
      </button>
    </>
  )
}

export default CreateTaskButton
