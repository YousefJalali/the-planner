import useSWR from 'swr'
import { ProjectType } from '../types/ProjectType'
import { recentProjectsKey } from './keys'

const useFetchedRecentProjects = () => {
  const { data, error, mutate } = useSWR<{ data: ProjectType[]; error: Error }>(
    recentProjectsKey()
  )

  const projects = data?.data || []
  const isLoading = !error && !data
  const setProjects = mutate

  return { projects, setProjects, error, isLoading }
}

export default useFetchedRecentProjects
