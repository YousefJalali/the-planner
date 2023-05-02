import { Task } from './TaskType'
import { Project as ProjectType } from '@prisma/client'

export type Project = ProjectType
export type ProjectWithTasks = Project & {
  tasks: Task[]
}
export type ProjectTasksCount = Project & {
  _count: { tasks: number }
}

export type ProjectWithTasksAndCount = ProjectWithTasks & ProjectTasksCount
