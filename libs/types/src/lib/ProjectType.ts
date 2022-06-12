import { TaskType } from './TaskType'
import { Project } from '@prisma/client'

export type ProjectType = Project
export type ProjectWithTasksType = Project & {
  tasks: TaskType[]
}
export type ProjectTasksCount = ProjectType & {
  _count: { tasks: number }
}

export type ProjectWithTasksAndCount = ProjectWithTasksType & ProjectTasksCount
