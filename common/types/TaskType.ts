export enum Status {
  PROPOSED = 'proposed',
  INPROGRESS = 'inprogress',
  COMPLETED = 'completed',
}

export type imgType = {
  id: string
  height: number
  width: number
  path: string
}

export type TaskType = {
  id: string
  title: string
  description: string
  project: string
  // project: {
  //   id: string
  //   title: string
  //   color: string
  // }
  isOpen: boolean
  startDate: string
  startTime?: string
  endDate?: string
  endTime?: string
  attachments?: imgType[]
  status: Status
}
