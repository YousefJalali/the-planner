import { Status } from '../types/TaskType'

export const statusAlias = (status: Status) => {
  return status === Status.PROPOSED
    ? 'Pending'
    : status === Status.INPROGRESS
    ? 'Ongoing'
    : 'Completed'
}
