import { ProjectType } from './ProjectType'
import { Task, Status, Image } from '@prisma/client'

export { Status }
export type ImageType = Image

export type TaskType = Task
export type TaskWithProjectType = Task & {
  project: Pick<ProjectType, 'title' | 'color' | 'id'>
}
