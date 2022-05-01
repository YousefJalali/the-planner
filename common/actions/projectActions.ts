import { projectKey, projectsKey } from '../data/keys'
import { ProjectType } from '../types/ProjectType'
import customFetch from '../utils/customFetch'
import getErrorMessage from '../utils/getErrorMessage'

export const createProject = async (project: ProjectType) => {
  try {
    return await customFetch(`${projectsKey()}/create`, 'POST', project)
  } catch (error) {
    return { error: getErrorMessage(error) }
  }
}

export const editProject = async (project: ProjectType) => {
  try {
    return await customFetch(`${projectKey(project.id)}/edit`, 'PUT', project)
  } catch (error) {
    return { error: getErrorMessage(error) }
  }
}

export const deleteProject = async (projectId: string) => {
  try {
    return await customFetch(`${projectKey(projectId)}/delete`, 'DELETE')
  } catch (error) {
    return { error: getErrorMessage(error) }
  }
}
