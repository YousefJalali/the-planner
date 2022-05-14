import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { ProjectType } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import { recentProjectsKey } from './keys'

type ProjectWithTasksCount = ProjectType & { _count: { tasks: number } }

const useRecentProjects = () => {
  const key = recentProjectsKey()
  const { data, error, mutate } = useSWR<{
    data: ProjectWithTasksCount[]
    error: Error
  }>(key, customFetch, { use: [requestLogger] })

  const projects = data?.data || []
  const isLoading = !error && !data
  const setProjects = mutate

  return { projects, setProjects, error, isLoading }
}

export default useRecentProjects
