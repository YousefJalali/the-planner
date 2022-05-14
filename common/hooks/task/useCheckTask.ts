import { Status, TaskWithProjectType } from '../../types/TaskType'
import useUpdateTaskStatus from './useUpdateTaskStatus'

const useCheckTask = (
  projectId: string | null,
  date: string | null,
  callback?: (action?: any) => void | null
) => {
  const { taskStatusHandler } = useUpdateTaskStatus(
    projectId || null,
    date || null
  )

  const checkTaskHandler = (task: TaskWithProjectType) => {
    const newStatus =
      task.status === Status.PROPOSED || task.status === Status.INPROGRESS
        ? Status.COMPLETED
        : Status.PROPOSED

    taskStatusHandler(task, task.status, newStatus)
  }

  return { checkTaskHandler }
}

export default useCheckTask
