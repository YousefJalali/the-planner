import { taskKey, tasksKey } from '@the-planner/data'
import { Status, Task } from '@the-planner/types'
import { customFetch } from '@the-planner/utils'

export const createTask = async (
  url: string | [string, string],
  { arg }: { arg: Task }
) =>
  await customFetch(url, {
    method: 'POST',
    bodyData: arg,
  })
export const editTask = async (
  url: string | [string, string],
  { arg }: { arg: Task }
) =>
  await customFetch(url, {
    method: 'PUT',
    bodyData: arg,
  })

export const changeTaskStatus = async (
  url: string | [string, string],
  { arg }: { arg: Task }
) =>
  await customFetch(url, {
    method: 'PUT',
    bodyData: arg,
  })

export const deleteTask = async (
  url: string | [string, string],
  { arg }: { arg: Task }
) =>
  await customFetch(url, {
    method: 'DELETE',
    bodyData: arg,
  })

// export const editTask = async (task: Task) =>
//   await customFetch(`${taskKey(task.id)}/edit`, 'PUT', task)

// export const changeTaskStatus = async (taskId: string, status: Status) =>
//   await customFetch(`${taskKey(taskId)}?status=${status}`, 'PUT')

// export const deleteTask = async (taskId: string) =>
//   await customFetch(`${taskKey(taskId)}/delete`, 'DELETE')
