import _ from 'lodash'
import { Status, TaskType } from '../../types/TaskType'

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
  console.log('here')
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
