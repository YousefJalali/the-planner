import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { ProjectType } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import { projectsKey } from './keys'

const useProjects = (from?: string) => {
  const key = projectsKey()
  const { data, error, mutate } = useSWR<{ data: ProjectType[]; error: Error }>(
    key,
    customFetch,
    { use: [requestLogger] }
  )

  const projects = data?.data || []
  const isLoading = !error && !data
  const setProjects = mutate

  return { projects, setProjects, error, isLoading }
}

export default useProjects
