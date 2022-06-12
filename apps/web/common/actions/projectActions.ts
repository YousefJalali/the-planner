import { projectKey, projectsKey } from '../data/keys'
import { ProjectType } from '@the-planner/types'
import customFetch from '../utils/customFetch'

export const createProject = async (project: ProjectType) =>
  await customFetch(`${projectsKey()}/create`, 'POST', project)

export const editProject = async (project: ProjectType) =>
  await customFetch(`${projectKey(project.id)}/edit`, 'PUT', project)

export const deleteProject = async (projectId: string) =>
  await customFetch(`${projectKey(projectId)}/delete`, 'DELETE')
