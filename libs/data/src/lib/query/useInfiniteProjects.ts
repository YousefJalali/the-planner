import { Status } from '@prisma/client'
import * as _ from 'lodash'
import useSWRInfinite from 'swr/infinite'
import { ProjectWithTasksAndCount } from '@the-planner/types'
import { customFetch, getErrorMessage } from '@the-planner/utils'

export const LIMIT = 16

const getKey = (
  pageIndex: number,
  previousPageData: {
    data: ProjectWithTasksAndCount[]
    nextCursor: string
  },
  filter?: Omit<Status, 'proposed'> | null
) => {
  // const key = projectsKey()
  const key = '/api/projects'

  const baseURL = filter
    ? `${key}?limit=${LIMIT}&q=${filter.toLowerCase()}`
    : `${key}?limit=${LIMIT}`

  // reached the end
  if (
    previousPageData &&
    (previousPageData.data.length <= 0 || !previousPageData.data)
  )
    return null

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return baseURL

  // add the cursor to the API endpoint
  return `${baseURL}&cursor=${previousPageData?.nextCursor}`
}

export const useInfiniteProjects = (
  filter?: Omit<Status, 'proposed'> | null
) => {
  let key: string | null = ''
  const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      key = getKey(pageIndex, previousPageData, filter)
      return '/api/projects'
    },
    () => {
      return key ? customFetch(key, {}) : null
    }
  )

  const p = data?.map((d) => [...d.data])

  const projects = p ? _.compact(p.flat()) : []
  const isLoading = !error && !data
  const hasReachedEnd =
    p?.[0]?.length === 0 || (p && p[p.length - 1]?.length < LIMIT)

  return {
    projects,
    error: getErrorMessage(error),
    isLoading,
    size,
    setSize,
    isValidating,
    mutate,
    hasReachedEnd,
  }
}

export default useInfiniteProjects
