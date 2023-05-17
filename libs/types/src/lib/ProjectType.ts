import { Task } from './TaskType'
import { Project as ProjectType } from '@prisma/client'

export type Project = ProjectType
export type ProjectWithTasks = Project & {
  tasks: Task[]
}
export type ProjectWithTaskCount = Project & {
  _count: { tasks: number }
}

// export type ProjectWithTaskStatus = Project & {
//   tasks: {  }
// }

export type ProjectWithTasksAndCount = ProjectWithTasks & ProjectWithTaskCount
