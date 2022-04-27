import { projectKey, projectsKey } from '../data/keys'
import { ProjectType } from '../types/ProjectType'
import customFetch from '../utils/customFetch'

export const createProject = (project: ProjectType) =>
  customFetch(`${projectsKey()}/create`, 'POST', project)

export const editProject = (project: ProjectType) =>
  customFetch(projectKey(project.id), 'PUT', project)
