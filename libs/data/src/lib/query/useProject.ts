import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { ProjectWithTasksAndCount } from '@the-planner/types'
import { customFetch, getErrorMessage } from '@the-planner/utils'
import { projectKey } from '../keys'

export const useProject = (projectId: string | null) => {
  const { data, error, mutate } = useSWR(
    projectId ? projectKey(projectId) : null,
    customFetch,
    {
      use: [requestLogger],
    }
  )

  const project: ProjectWithTasksAndCount = data?.data || null
  const isLoading = !error && !data

  return { project, mutate, error: getErrorMessage(error), isLoading }
}

export default useProject
