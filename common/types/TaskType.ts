import { ProjectType } from './ProjectType'
import { ImageType } from './ImageType'

export enum Status {
  PROPOSED = 'pending',
  INPROGRESS = 'ongoing',
  COMPLETED = 'completed',
}

export type TaskProjectType = Omit<
  ProjectType,
  | 'description'
  | 'tasks'
  | 'proposed'
  | 'inprogress'
  | 'completed'
  | 'progress'
  | 'isHidden'
  | 'progressPercentage'
>

export type TaskType = {
  id: string
  title: string
  description: string
  project: string | TaskProjectType
  openTask: boolean
  date: {
    startDate: Date
    endDate: Date | null
  }
  time: {
    startTime: Date | null
    endTime: Date | null
  }
  attachments: ImageType[] | []
  status: Status
}
