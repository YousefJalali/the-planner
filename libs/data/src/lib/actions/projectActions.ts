import { Project } from '@the-planner/types'
import { customFetch } from '@the-planner/utils'

export const createProject = async (
  url: string | [string, string],
  { arg }: { arg: Project }
) =>
  await customFetch(url, {
    method: 'POST',
    bodyData: arg,
  })

export const editProject = async (
  url: string | [string, string],
  { arg }: { arg: Project }
) =>
  await customFetch(url, {
    method: 'PUT',
    bodyData: arg,
  })

export const deleteProject = async (
  url: string | [string, string],
  { arg }: { arg: string }
) =>
  await customFetch(url, {
    method: 'DELETE',
    // bodyData: arg,
  })
