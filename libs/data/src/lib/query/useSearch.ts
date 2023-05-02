import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { TaskWithProject } from '@the-planner/types'
import { customFetch, getErrorMessage } from '@the-planner/utils'

export const useSearch = (query: string | null) => {
  const res = useSWR(query ? `/api/search?q=${query}` : null, customFetch, {
    use: [requestLogger],
  })

  const { data, error, mutate } = res

  const searchedTasks: TaskWithProject[] = data?.data || []
  const isLoading = !data && !error
  const errorMessage = getErrorMessage(error)

  return { searchedTasks, error: errorMessage, isLoading, mutate }
}

export default useSearch
