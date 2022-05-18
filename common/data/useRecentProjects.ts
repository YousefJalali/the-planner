import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { ProjectWithTasksType } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import { projectsKey } from './keys'

type ProjectWithTasksCount = ProjectWithTasksType & {
  _count: { tasks: number }
}

const useRecentProjects = () => {
  const key = `${projectsKey()}?limit=4`

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
