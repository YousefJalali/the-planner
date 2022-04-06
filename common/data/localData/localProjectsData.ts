import _ from 'lodash'
import { ProjectType } from '../../types/ProjectType'
import { TaskType } from '../../types/TaskType'

export const addTaskToLocalProjectData = (
  data: ProjectType,
  formData: TaskType
) => {
  return new Promise<ProjectType>((resolve, reject) => {
    resolve({ ...data, tasks: [formData, ...data.tasks] as TaskType[] })
  })
}

export const removeTaskFromLocalProjectData = (
  data: ProjectType,
  id: string
) => {
  return new Promise<ProjectType>((resolve, reject) => {
    resolve({
      ...data,
      tasks: (data.tasks as TaskType[]).filter((task) => task.id !== id),
    })
  })
}
