import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { ProjectWithTasksAndCount } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import getErrorMessage from '../utils/getErrorMessage'
import { projectKey } from './keys'

const useProject = (projectId: string | null) => {
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
