import useSWR from 'swr'
import { TaskWithProject } from '@the-planner/types'
import { customFetch, getErrorMessage } from '@the-planner/utils'

type QueryType = {
  limit?: number
  d?: string
  id?: string
}

type Query<Type> = {
  [Property in keyof Type]: string
}

export const useTasks = (query: Query<QueryType>) => {
  const { data, error, mutate } = useSWR(
    `/api/tasks?${new URLSearchParams(query).toString()}`,
    (url) => customFetch(url, {})
  )
  // const { data, error, mutate } = useSWR('/api/tasks', (url) =>
  //   customFetch([url, `?${new URLSearchParams(query).toString()}`], {})
  // )

  const tasks: TaskWithProject[] = data?.data || []
  const isLoading = !data && !error
  const errorMessage = getErrorMessage(error)

  return { tasks, error: errorMessage, isLoading, mutate }
}

export default useTasks
