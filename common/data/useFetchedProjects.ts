import useSWR from 'swr'
import { ProjectType } from '../types/ProjectType'
import { projectsKey } from './keys'

const useFetchedProjects = (from?: string) => {
  // console.log('fetch projects from ', from)

  const { data, error, mutate } = useSWR<{ data: ProjectType[]; error: Error }>(
    projectsKey()
  )

  const projects = data?.data || []
  const isLoading = !error && !data
  const setProjects = mutate

  return { projects, setProjects, error, isLoading }
}

export default useFetchedProjects
