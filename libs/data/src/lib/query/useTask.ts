import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { TaskWithProject } from '@the-planner/types'
import { customFetch, getErrorMessage } from '@the-planner/utils'
import { taskKey } from '../keys'

export const useTask = (taskId: string | null) => {
  const key = taskId ? taskKey(taskId) : null

  const { data, error, mutate } = useSWR(key, customFetch, {
    use: [requestLogger],
  })

  const task: TaskWithProject = data?.data || null
  const isLoading = !error && !data

  return { task, error: getErrorMessage(error), isLoading, mutate }
}

export default useTask
