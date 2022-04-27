import { Status, TaskType } from '../types/TaskType'
import customFetch from '../utils/customFetch'

export const createTask = async (task: TaskType) => {
  try {
    return await customFetch('/api/tasks/create', 'POST', task)
  } catch (error) {
    return { error }
  }
}

export const editTask = async (task: TaskType) => {
  try {
    return await customFetch(`/api/tasks/${task.id}/edit`, 'PUT', task)
  } catch (error) {
    return { error }
  }
}

export const changeTaskStatus = async (taskId: string, status: Status) => {
  try {
    return await customFetch(`/api/tasks/${taskId}?status=${status}`, 'PUT')
  } catch (error) {
    return { error }
  }
}

export const deleteTask = async (taskId: string) => {
  try {
    return await customFetch(`/api/tasks/${taskId}/delete`, 'DELETE')
  } catch (error) {
    return { error }
  }
}
