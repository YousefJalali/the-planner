import { ProjectType } from './ProjectType'
import { Task, Status, Image } from '@prisma/client'

export { Status }
export type ImageType = Image
// export enum Status {
//   PROPOSED = 'pending',
//   INPROGRESS = 'ongoing',
//   COMPLETED = 'completed',
// }

export type TaskType = Task
export type TaskWithProjectType = Task & {
  project: Pick<ProjectType, 'title' | 'color' | 'id'>
}
