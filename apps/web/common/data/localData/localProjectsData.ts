import _ from 'lodash'
import {
  ProjectWithTasksAndCount,
  ProjectWithTasksType,
} from '@the-planner/types'
import { Status, TaskType } from '@the-planner/types'

//create task
export const addTaskToLocalProjectData = (
  data: ProjectWithTasksType,
  formData: TaskType
) => {
  return new Promise<{ data: ProjectWithTasksType }>((resolve, reject) => {
    resolve({
      data: { ...data, tasks: [formData, ...data.tasks] as TaskType[] },
    })
  })
}

//delete task
export const removeTaskFromLocalProjectData = (
  data: ProjectWithTasksType,
  id: string
) => {
  return new Promise<{ data: ProjectWithTasksType }>((resolve, reject) => {
    resolve({
      data: {
        ...data,
        tasks: (data.tasks as TaskType[]).filter((task) => task.id !== id),
      },
    })
  })
}

//edit project
// export const updateProjectInLocalProjectId = (
//   data: ProjectType,
//   formData: ProjectType
// ) => {
//   return new Promise<{ data: ProjectType }>((resolve, reject) => {
//     resolve({ data: { ...formData } })
//   })
// }

//edit task
export const updateTaskInLocalProject = (
  data: ProjectWithTasksType,
  formData: TaskType
) => {
  return new Promise<{ data: ProjectWithTasksType }>((resolve, reject) => {
    resolve({
      data: {
        ...data,
        tasks: data.tasks.map((task) => {
          return task.id === formData.id ? { ...formData } : task
        }),
      },
    })
  })
}

export const updateTaskStatusInLocalProject = (
  data: ProjectWithTasksAndCount,
  taskId: string,
  newStatus: Status
) => {
  return new Promise<{ data: ProjectWithTasksAndCount }>((resolve, reject) => {
    resolve({
      data: {
        ...data,
        tasks: (data.tasks as TaskType[]).map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        ),
      },
    })
  })
}
