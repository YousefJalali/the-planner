import { Status } from '@prisma/client'
import _ from 'lodash'
import useSWRInfinite from 'swr/infinite'
import { requestLogger } from '../middlewares/requestLogger'
import { ProjectType } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import { projectsKey } from './keys'

export const LIMIT = 6

const getKey = (
  pageIndex: number,
  previousPageData: { data: ProjectType[]; nextCursor: string },
  filter?: Omit<Status, 'proposed'> | null
) => {
  const key = projectsKey()

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

const useInfiniteProjects = (filter?: Omit<Status, 'proposed'> | null) => {
  const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite<
    {
      data: ProjectType[]
      nextCursor?: string
    },
    { error: Error }
  >(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, filter),
    customFetch,
    { use: [requestLogger] }
  )

  const p = data?.map((d) => [...d.data])

  const projects = p ? _.compact(p.flat()) : []
  const isLoading = !error && !data
  const hasReachedEnd =
    p?.[0]?.length === 0 || (p && p[p.length - 1]?.length < LIMIT)

  return {
    projects,
    error,
    isLoading,
    size,
    setSize,
    isValidating,
    mutate,
    hasReachedEnd,
  }
}

export default useInfiniteProjects
