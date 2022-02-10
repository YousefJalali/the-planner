import { TaskType } from './TaskType'

export type ProjectType = {
  id: string
  title: string
  description: string
  color: string
  tasks: string[] | TaskType[]
  proposed: number
  inprogress: number
  completed: number
  progressPercentage: number
  isHidden: boolean
}
