import { Project } from './ProjectType'
import { Task as TaskType, Status, Image } from '@prisma/client'

export { Status }
export type Attachment = Image

export type Task = TaskType
export type TaskWithProject = Task & {
  project: Pick<Project, 'title' | 'color' | 'id'>
}
