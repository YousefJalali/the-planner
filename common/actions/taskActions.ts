import { Status, TaskType } from '../types/TaskType'

export const createTask = async (formData: TaskType, cb: () => void) => {
  try {
    const res = await fetch('/tasks/', {
      method: 'POST',
      body: JSON.stringify({ task: formData }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { success, data: createdTask } = await res.json()
    if (success) {
      cb()
    }
  } catch (error) {
    console.log(error)
  }
}

export const deleteTask = async (taskId: string, cb: () => void) => {
  try {
    const res = await fetch(`/tasks/${taskId}`, {
      method: 'DELETE',
      // body: JSON.stringify(taskId),
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

export const editTask = async (task: TaskType, cb: () => void) => {
  try {
    const res = await fetch(`/tasks/${task.id}`, {
      method: 'POST',
      body: JSON.stringify({ task }),
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
