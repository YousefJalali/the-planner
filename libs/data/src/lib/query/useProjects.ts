import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { Project } from '@the-planner/types'
import { customFetch, getErrorMessage } from '@the-planner/utils'
import { projectsKey } from '../keys'

export const useProjects = (query?: string) => {
  const key = `${projectsKey()}?q=${query}`
  const { data, error, mutate } = useSWR(key, customFetch, {
    use: [requestLogger],
  })

  // console.log(data)

  const projects: Project[] = data?.data || []
  const isLoading = !error && !data

  return { projects, mutate, error: getErrorMessage(error), isLoading }
}

export default useProjects
