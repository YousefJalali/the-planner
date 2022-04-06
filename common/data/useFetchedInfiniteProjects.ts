import _ from 'lodash'
import { KeyedMutator } from 'swr'
import useSWRInfinite from 'swr/infinite'
import { APIErrorType } from '../types/APIErrorType'
import { ProjectType } from '../types/ProjectType'

const getKey = (pageIndex: number, previousPageData: ProjectType[]) => {
  if (previousPageData && !previousPageData.length) return null
  return `/projects?page=${pageIndex + 1}&limit=10`
}

const getProjects = async (url: string | null) => {
  if (!url) return

  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error(
      'An error occurred while fetching the data.'
    ) as APIErrorType

    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status

    throw error
  }

  const data: ProjectType[] = await res.json()
  return data
}

const useInfiniteFetchedProjects = () => {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    getProjects
  )

  const projects: ProjectType[] = data ? _.compact(data.flat()) : []
  const isLoading = !error && !data
  const setProjects = mutate

  return {
    projects,
    setProjects,
    error,
    isLoading,
    size,
    setSize,
    isValidating,
  }
}

export default useInfiniteFetchedProjects
