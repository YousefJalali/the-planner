import { TaskType } from './TaskType'
import { Project } from '@prisma/client'

export type ProjectType = Project
export type ProjectWithTasksType = Project & {
  tasks: TaskType[]
}
export type ProjectTasksCount = ProjectType & {
  _count: { tasks: number }
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
