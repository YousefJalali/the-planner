import { Status } from '@the-planner/types'

export const statusAlias = (status: Status) => {
  return status === Status.PROPOSED
    ? 'Pending'
    : status === Status.INPROGRESS
    ? 'Ongoing'
    : 'Completed'
}
