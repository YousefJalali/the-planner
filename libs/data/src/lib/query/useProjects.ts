import useSWR from 'swr'
import { ProjectWithTasksAndCount } from '@the-planner/types'
import { customFetch, getErrorMessage } from '@the-planner/utils'

type QueryType = {
  limit?: number
  q?: string
  projectId?: string
}

type Query<Type> = {
  [Property in keyof Type]: string
}

export const useProjects = (query: Query<QueryType>) => {
  // const key = `${projectsKey()}?q=${query}`
  // const { data, error, mutate } = useSWR(key, customFetch, {
  //   use: [requestLogger],
  // })
  const { data, error, mutate } = useSWR(
    ['/api/projects', `?${new URLSearchParams(query).toString()}`],
    (url) => customFetch(url, {})
  )
  // const { data, error, mutate } = useSWR('/api/projects', (url) =>
  //   customFetch([url, `?${new URLSearchParams(query).toString()}`], {})
  // )

  // console.log(data)

  const projects: ProjectWithTasksAndCount[] = data?.data || []
  const isLoading = !error && !data

  return { projects, mutate, error: getErrorMessage(error), isLoading }
}

export default useProjects
