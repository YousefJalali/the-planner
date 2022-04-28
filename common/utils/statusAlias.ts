import { Status } from '../types/TaskType'

export const statusAlias = (status: Status) => {
  return status === Status.PROPOSED
    ? 'Proposed'
    : status === Status.INPROGRESS
    ? 'Ongoing'
    : 'Completed'
}
