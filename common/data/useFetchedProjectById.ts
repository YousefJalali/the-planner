import useSWR from 'swr'
import { ProjectType } from '../types/ProjectType'

const getProject = async (id: string) => {
  const res = await fetch(`/projects/${id}`)
  const data: ProjectType = await res.json()
  return data
}

const useFetchedProjectById = (projectId: string | null) => {
  const { data, error, mutate } = useSWR<ProjectType, Error>(
    projectId ? `/projects/${projectId}` : null
  )
  // const { data, error, mutate } = useSWR(`/project/${projectId}`, () =>
  //   getProject(projectId)
  // )

  const project = data || null
  const isLoading = !error && !data
  const setProject = mutate

  return { project, setProject, error, isLoading }
}

export default useFetchedProjectById
