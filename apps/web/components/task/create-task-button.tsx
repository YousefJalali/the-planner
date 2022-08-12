import { FC } from 'react'
import { useModal } from '@the-planner/hooks'
import { useCreateTask } from '@the-planner/data'
import { TaskType } from '@the-planner/types'
import { FloatingButton } from '@the-planner/ui-web'
import { TaskForm } from './task-form'
import { parseUrlDate } from '@the-planner/utils'
import { useRouter } from 'next/router'

type Props = {
  date?: string
}

const CreateTaskButton: FC<Props> = ({ date }) => {
  const router = useRouter()

  const urlDate =
    typeof router.query.d === 'string' ? String(router.query.d) : null

  const currentDate = urlDate || date

  const { setModal, clearModal } = useModal()

  const showForm = (defValues?: Partial<TaskType>, serverErrors?: object) => {
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
    <FloatingButton
      name="create task button"
      id="create-task-button"
      onClick={() => showForm()}
    />
  )
}

export default CreateTaskButton
