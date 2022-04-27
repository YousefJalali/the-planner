import _ from 'lodash'
import { Status, TaskType } from '../../types/TaskType'

//create task
export const addTaskToLocalTasksData = (
  data: TaskType[],
  formData: TaskType
) => {
  return new Promise<{ data: TaskType[] }>((resolve, reject) => {
    resolve({ data: [...data, { ...formData }] })
  })
}

//edit task
export const updateTaskInLocalTasksData = (
  data: TaskType[],
  formData: TaskType
) => {
  return new Promise<{ data: TaskType[] }>((resolve, reject) => {
    resolve({
      data: [
        ...data.map((task) =>
          task.id === formData.id
            ? {
                ...formData,
              }
            : task
        ),
      ],
    })
  })
}

export const removeTaskFromLocalTasksData = (data: TaskType[], id: string) => {
  return new Promise<{ data: TaskType[] }>((resolve, reject) => {
    resolve({ data: [...data.filter((task) => task.id !== id)] })
  })
}

export const updateTaskStatusInLocalTasksData = (
  data: TaskType[],
  taskId: string,
  status: Status
) => {
  console.log('local data', data)
  return data
  return new Promise<{ data: TaskType[] }>((resolve, reject) => {
    resolve({
      data: [
        ...data.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status,
              }
            : task
        ),
      ],
    })
  })
}
