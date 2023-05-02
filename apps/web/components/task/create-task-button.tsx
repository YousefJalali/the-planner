import { FC } from 'react'
import { useModal } from '@the-planner/hooks'
import { useCreateTask } from '@the-planner/data'
import { Task } from '@the-planner/types'
import { TaskForm } from './task-form'
import { parseUrlDate } from '@the-planner/utils'
import { useRouter } from 'next/router'
import { FiPlus } from 'react-icons/fi'

type Props = {
  date?: string
}

const CreateTaskButton: FC<Props> = ({ date }) => {
  const router = useRouter()

  const urlDate =
    typeof router.query.d === 'string' ? String(router.query.d) : null

  const currentDate = urlDate || date

  const { setModal, clearModal } = useModal()

  const showForm = (defValues?: Partial<Task>, serverErrors?: object) => {
    setModal({
      id: 'task-create',
      fullScreen: true,
      title: 'New Task',
      content: (
        <TaskForm
          id="create"
          defaultValues={
            defValues || {
              ...(currentDate && {
                startDate: parseUrlDate(currentDate as string),
              }),
              ...defaultValues,
            }
          }
          onSubmit={onSubmit}
          serverErrors={serverErrors}
        />
      ),
    })
  }

  const { onSubmit, defaultValues } = useCreateTask(
    currentDate || new Date().toDateString(),
    showForm,
    () => clearModal('task-create')
  )

  return (
    <button
      name="create task button"
      id="create-task-button"
      onClick={() => showForm()}
      className="fixed bottom-6 right-6 btn btn-circle btn-primary shadow-xl"
    >
      <FiPlus size={24} />
    </button>
  )
}

export default CreateTaskButton
