import _ from 'lodash'
import useSWRInfinite from 'swr/infinite'
import { ProjectType } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import { projectsKey } from './keys'

const getKey = (
  pageIndex: number,
  previousPageData: { data: ProjectType[]; nextCursor: string }
) => {
  const LIMIT = 6

  // reached the end
  if (
    previousPageData &&
    (previousPageData.data.length <= 0 || !previousPageData.data)
  )
    return null

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return `${projectsKey()}?limit=${LIMIT}`

  // add the cursor to the API endpoint
  return `${projectsKey()}?cursor=${
    previousPageData?.nextCursor
  }&limit=${LIMIT}`
}

const useInfiniteFetchedProjects = () => {
  const { data, error, size, setSize, isValidating } = useSWRInfinite<{
    data: ProjectType[]
    error: Error
  }>(getKey, customFetch)

  const p = data?.map((d) => [...d.data])

  const projects = p ? _.compact(p.flat()) : []
  // const projects = data?.[0].data
  // const projects = data && data[0] && data[0].data
  // const projects = data ? _.compact(data.flat()) : []
  const isLoading = !error && !data

  return {
    projects,
    error,
    isLoading,
    size,
    setSize,
    isValidating,
  }
}

export default useInfiniteFetchedProjects
