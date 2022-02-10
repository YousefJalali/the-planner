import { FC } from 'react'
import { useSWRConfig } from 'swr'
import { TaskType, Status } from '../../common/types/TaskType'
import TaskForm from './TaskForm'

type Props = {
  onClose: () => void
}

const CreateTask: FC<Props> = ({ onClose }) => {
  const defaultValues: TaskType = {
    id: '',
    title: '',
    project: '',
    openTask: false,
    date: { startDate: new Date(), endDate: null },
    time: { startTime: null, endTime: null },
    description: '',
    attachments: [],
    status: Status.PROPOSED,
  }

  const { mutate } = useSWRConfig()

  const onSubmitHandler = async (formData: TaskType) => {
    const dateTasksKey = `/tasks/${encodeURI(
      formData.date.startDate.toDateString()
    )}`

    // mutate(
    //   dateTasksKey,
    //   (existingTasks: TaskType[]) => {
    //     console.log(`mutate: ${dateTasksKey}`, existingTasks)
    //     return existingTasks && [{ ...data }, ...existingTasks]
    //   },
    //   false
    // )

    try {
      const res = await fetch('/tasks/', {
        method: 'POST',
        body: JSON.stringify({ task: formData }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { success, data: createdTask } = await res.json()
      if (success) {
        onClose()
        console.log('res success', createdTask)
        mutate(dateTasksKey)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <TaskForm<TaskType>
        id='create-task-form'
        onSubmit={onSubmitHandler}
        defaultValues={defaultValues}
      />
    </>
  )
}

export default CreateTask
