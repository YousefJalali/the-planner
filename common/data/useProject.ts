import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { ProjectTasksCount, ProjectWithTasksType } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import { projectKey } from './keys'

const useProject = (projectId: string | null) => {
  const { data, error, mutate, isValidating } = useSWR<
    {
      data: ProjectWithTasksType & ProjectTasksCount
      error: Error
    },
    Error
  >(projectId ? projectKey(projectId) : null, customFetch, {
    use: [requestLogger],
  })

  const project = data?.data || null
  const isLoading = !error && !data
  const setProject = mutate

  return { project, setProject, error, isLoading }
}

export default useProject
