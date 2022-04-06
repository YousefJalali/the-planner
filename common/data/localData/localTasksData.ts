import _ from 'lodash'
import { ProjectType } from '../../types/ProjectType'
import { TaskType } from '../../types/TaskType'

export const addTaskToLocalTasksData = (
  data: TaskType[],
  formData: TaskType
) => {
  return new Promise<TaskType[]>((resolve, reject) => {
    resolve([...data, { ...formData }])
  })
}

export const removeTaskFromLocalTasksData = (data: TaskType[], id: string) => {
  return new Promise<TaskType[]>((resolve, reject) => {
    resolve([...data.filter((task) => task.id !== id)])
  })
}
