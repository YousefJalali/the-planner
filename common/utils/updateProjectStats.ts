import { Status } from '@prisma/client'

type Args = {
  proposed: number
  inprogress: number
  completed: number
  oldStatus: Status
  newStatus: Status
}

export const updateProjectStats = ({
  proposed,
  inprogress,
  completed,
  oldStatus,
  newStatus,
}: Args) => {
  const updated = {
    proposed:
      proposed +
      (oldStatus === Status.PROPOSED ? -1 : 0) +
      (newStatus === Status.PROPOSED ? 1 : 0),
    inprogress:
      inprogress +
      (oldStatus === Status.INPROGRESS ? -1 : 0) +
      (newStatus === Status.INPROGRESS ? 1 : 0),
    completed:
      completed +
      (oldStatus === Status.COMPLETED ? -1 : 0) +
      (newStatus === Status.COMPLETED ? 1 : 0),
  }

  return {
    ...updated,
    progressPercentage:
      updated.proposed + updated.completed + updated.inprogress <= 0
        ? 0
        : +(
            (updated.completed * 100) /
            (updated.proposed + updated.completed + updated.inprogress)
          ).toFixed(0),
  }
}
