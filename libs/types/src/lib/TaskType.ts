import { Project } from './ProjectType'
import {
  Task as TaskType,
  Status,
  Attachment as AttachmentType,
} from '@prisma/client'

export { Status }
export type Attachment = AttachmentType

export type Task = TaskType
export type TaskWithProject = Task & {
  project: Pick<Project, 'title' | 'color' | 'id'>
}
