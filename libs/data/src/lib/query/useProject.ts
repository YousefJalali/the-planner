import useSWR from 'swr'
import { ProjectWithTasksAndCount } from '@the-planner/types'
import { customFetch, getErrorMessage } from '@the-planner/utils'

export const useProject = (projectId: string | null) => {
  const { data, error, mutate } = useSWR(
    !projectId ? null : `/api/projects?projectId=${projectId}`,
    (url) => customFetch(url, {})
  )

  const project: ProjectWithTasksAndCount = data?.data || null
  const isLoading = !error && !data

  return { project, mutate, error: getErrorMessage(error), isLoading }
}

export default useProject
