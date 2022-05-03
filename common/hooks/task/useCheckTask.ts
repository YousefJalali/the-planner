import { Status, TaskWithProjectType } from '../../types/TaskType'
import useUpdateTaskStatus from './useUpdateTaskStatus'

const useCheckTask = (callback?: (action?: any) => void) => {
  const { taskStatusHandler } = useUpdateTaskStatus('dateTasks')

  const checkTaskHandler = (task: TaskWithProjectType) => {
    const s =
      task.status === Status.PROPOSED || task.status === Status.INPROGRESS
        ? Status.COMPLETED
        : Status.PROPOSED

    taskStatusHandler(task, s)
  }

  return { checkTaskHandler }
}

export default useCheckTask
