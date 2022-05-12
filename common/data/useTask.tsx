import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { TaskWithProjectType } from '../types/TaskType'
import customFetch from '../utils/customFetch'
import { taskKey } from './keys'

const useTask = (taskId: string | null) => {
  const key = taskId ? taskKey(taskId) : null

  const { data, error } = useSWR<
    { data: TaskWithProjectType; error: Error },
    Error
  >(key, customFetch, { use: [requestLogger] })

  const task = data?.data || null
  const isLoading = !error && !data

  return { task, error, isLoading }
}

export default useTask
