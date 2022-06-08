import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { ProjectType } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import getErrorMessage from '../utils/getErrorMessage'
import { projectsKey } from './keys'

const useProjects = (query?: string) => {
  const key = `${projectsKey()}?q=${query}`
  const { data, error, mutate } = useSWR(key, customFetch, {
    use: [requestLogger],
  })

  // console.log(data)

  const projects: ProjectType[] = data?.data || []
  const isLoading = !error && !data

  return { projects, mutate, error: getErrorMessage(error), isLoading }
}

export default useProjects
