import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { TaskWithProject } from '@the-planner/types'
import { customFetch, getErrorMessage } from '@the-planner/utils'

export const useRecentTasks = () => {
  const res = useSWR('/api/tasks/recent', customFetch, {
    use: [requestLogger],
  })

  const { data, error, mutate } = res

  const recentTasks: TaskWithProject[] = data?.data || []
  const isLoading = !data && !error
  const errorMessage = getErrorMessage(error)

  return { recentTasks, error: errorMessage, isLoading, mutate }
}

export default useRecentTasks
