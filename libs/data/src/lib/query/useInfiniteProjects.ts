import { Status } from '@prisma/client'
import useSWRInfinite from 'swr/infinite'
import { customFetch, getErrorMessage } from '@the-planner/utils'
import compact from 'lodash-es/compact'
import { ProjectWithTasksAndCount } from '@the-planner/types'

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
      // return getKey(pageIndex, previousPageData, filter)
      key = getKey(pageIndex, previousPageData, filter)
      return '/api/projects'
    },
    (url) => {
      // console.log(url)
      // return customFetch(url, {})
      return key ? customFetch(key, {}) : null
    },
    { revalidateAll: true }
  )

  const p = data?.map((d) => [...d.data])

  const projects: ProjectWithTasksAndCount[] = p ? compact(p.flat()) : []
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
