import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { TaskWithProject } from '@the-planner/types'
import { customFetch, getErrorMessage } from '@the-planner/utils'
import { dateTasksKey } from '../keys'

export const useDateTasks = (date: string | null) => {
  const res = useSWR(date ? dateTasksKey(date) : null, customFetch, {
    use: [requestLogger],
  })

  const { data, error, mutate } = res

  const dateTasks: TaskWithProject[] = data?.data || []
  const isLoading = !data && !error
  const errorMessage = getErrorMessage(error)

  return { dateTasks, error: errorMessage, isLoading, mutate }
}

export default useDateTasks
