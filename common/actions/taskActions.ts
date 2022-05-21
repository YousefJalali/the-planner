import { useNotification } from '../contexts/NotificationCtx'
import { taskKey, tasksKey } from '../data/keys'
import { Status, TaskType } from '../types/TaskType'
import customFetch from '../utils/customFetch'
import getErrorMessage from '../utils/getErrorMessage'

export const createTask = async (task: TaskType) => {
  try {
    return await customFetch(`${tasksKey()}/create`, 'POST', task)
  } catch (error) {
    return { error: getErrorMessage(error) }
  }
}

export const editTask = async (task: TaskType) => {
  try {
    return await customFetch(`${taskKey(task.id)}/edit`, 'PUT', task)
  } catch (error) {
    return { error: getErrorMessage(error) }
  }
}

export const changeTaskStatus = async (taskId: string, status: Status) => {
  // try {
  //   return await customFetch(`${taskKey(taskId)}?status=${status}`, 'PUT')
  // } catch (error) {
  //   console.log(error)
  // }
  return await customFetch(`${taskKey(taskId)}?status=${status}`, 'PUT')
}

export const deleteTask = async (taskId: string) => {
  try {
    return await customFetch(`${taskKey(taskId)}/delete`, 'DELETE')
  } catch (error) {
    return { error: getErrorMessage(error) }
  }
}
