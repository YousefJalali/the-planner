import { Status, TaskWithProjectType } from '../../types/TaskType'
import useUpdateTaskStatus from './useUpdateTaskStatus'

const useCheckTask = (callback?: (action?: any) => void) => {
  const { taskStatusHandler } = useUpdateTaskStatus()

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
