import useSWR from 'swr'
import { TaskWithProject } from '@the-planner/types'
import { customFetch, getErrorMessage } from '@the-planner/utils'

export const useTask = (taskId: string | null) => {
  const { data, error, mutate } = useSWR(
    !taskId ? null : ['/api/tasks', `?taskId=${taskId}`],
    (url) => customFetch(url, {})
  )

  const task: TaskWithProject | null = data?.data || undefined
  const isLoading = !error && !data

  return { task, error: getErrorMessage(error), isLoading, mutate }
}

export default useTask
