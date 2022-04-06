import { Status, TaskType } from '../types/TaskType'
import getErrorMessage from '../utils/getErrorMessage'

export const createTask = async (task: TaskType) => {
  try {
    const res = await fetch('/tasks/', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return await res.json()
  } catch (err) {
    return { error: getErrorMessage(err) }
  }
}

//delete
export const deleteTask = async (taskId: string) => {
  try {
    const res = await fetch(`/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(res.statusText)
    }

    return await res.json()
  } catch (err) {
    return { error: getErrorMessage(err) }
  }
}

//edit
export const editTask = async (task: TaskType, cb: () => void) => {
  try {
    const res = await fetch(`/tasks/${task.id}`, {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { success, data } = await res.json()

    if (success) {
      cb()
    }
  } catch (error) {
    console.log(error)
  }
}

export const changeTaskStatus = async (
  taskId: string,
  status: Status,
  cb: () => void
) => {
  try {
    const res = await fetch(`/tasks/${taskId}?status=${status}`, {
      method: 'PUT',
      // body: JSON.stringify({ task }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { success, data } = await res.json()

    if (success) {
      cb()
    }
  } catch (error) {
    console.log(error)
  }
}
