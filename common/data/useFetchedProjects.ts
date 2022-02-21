import useSWR from 'swr'
import { ProjectType } from '../types/ProjectType'

const getProjects = async () => {
  const res = await fetch('/projects')
  const data: ProjectType[] = await res.json()
  return data
}

const useFetchedProjects = () => {
  const { data, error, mutate } = useSWR('/projects', getProjects)

  const projects = data || []
  const isLoading = !data
  const setProjects = mutate

  return { projects, setProjects, error, isLoading }
}

export default useFetchedProjects
