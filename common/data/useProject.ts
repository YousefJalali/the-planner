import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { ProjectWithTasksAndCount } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import { projectKey } from './keys'

const useProject = (projectId: string | null) => {
  const { data, error, mutate } = useSWR(
    projectId ? projectKey(projectId) : null,
    customFetch,
    {
      use: [requestLogger],
    }
  )

  console.log(data)

  const project: ProjectWithTasksAndCount = data?.data || null
  const isLoading = !error && !data

  return { project, mutate, error, isLoading }
}

export default useProject
