import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { ProjectType } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import getErrorMessage from '../utils/getErrorMessage'
import { projectsKey } from './keys'

const useProjects = (from?: string) => {
  const key = projectsKey()
  const { data, error, mutate } = useSWR(key, customFetch, {
    use: [requestLogger],
  })

  const projects: ProjectType[] = data?.data || []
  const isLoading = !error && !data
  const setProjects = mutate

  return { projects, setProjects, error: getErrorMessage(error), isLoading }
}

export default useProjects
