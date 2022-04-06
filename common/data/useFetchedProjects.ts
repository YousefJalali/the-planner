import useSWR from 'swr'
import { APIErrorType } from '../types/APIErrorType'
import { ProjectType } from '../types/ProjectType'

const getProjects = async (url: string) => {
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

const useFetchedProjects = (from: string) => {
  // console.log('fetch projects from ', from)

  const { data, error, mutate } = useSWR('/projects', getProjects, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  const projects = data || []
  const isLoading = !error && !data
  const setProjects = mutate

  return { projects, setProjects, error, isLoading }
}

export default useFetchedProjects
