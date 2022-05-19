import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { ProjectWithTasksAndCount } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import { projectKey } from './keys'

const useProject = (projectId: string | null) => {
  const { data, error, mutate, isValidating } = useSWR(
    projectId ? projectKey(projectId) : null,
    customFetch,
    {
      use: [requestLogger],
    }
  )
  // const { data, error, mutate, isValidating } = useSWR<
  //   {
  //     data: ProjectWithTasksAndCount
  //     error: Error
  //   },
  //   Error
  // >(projectId ? projectKey(projectId) : null, customFetch, {
  //   use: [requestLogger],
  // })

  const project = data?.data || null
  const isLoading = !error && !data

  return { project, mutate, error, isLoading }
}

export default useProject
