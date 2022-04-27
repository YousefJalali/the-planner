import useSWR from 'swr'
import { ProjectWithTasksType } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import { projectKey } from './keys'

const useFetchedProjectById = (projectId: string | null) => {
  const { data, error, mutate } = useSWR<
    { data: ProjectWithTasksType; error: Error },
    Error
  >(projectId ? projectKey(projectId) : null, customFetch)

  const project = data?.data || null
  const isLoading = !error && !data
  const setProject = mutate

  return { project, setProject, error, isLoading }
}

export default useFetchedProjectById
