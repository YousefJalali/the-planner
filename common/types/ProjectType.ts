import { TaskType, TaskWithProjectType } from './TaskType'
import { Project } from '@prisma/client'

export type ProjectType = Project
export type ProjectWithTasksType = Project & {
  tasks: TaskType[]
}
// {
//   id: string
//   title: string
//   description: string
//   color: string
//   tasks: string[] | TaskType[]
//   proposed: number
//   inprogress: number
//   completed: number
//   progressPercentage: number
//   isHidden: boolean
// }
