import { Status } from '@the-planner/types'
import format from 'date-fns/format'
import { memo } from 'react'
import { FiClock } from 'react-icons/fi'
import Details from './task-item-details'

type Props = {
  openTask: boolean
  startTime: Date | null
  endTime: Date | null
  status: Status
}

export const Time = ({ openTask, startTime, endTime, status }: Props) => {
  let time = null

  const isTaskCompleted = status === Status.COMPLETED

  if (!openTask && startTime && endTime) {
    time = `${format(new Date(startTime), 'kk:mm')} - ${format(
      new Date(endTime),
      'kk:mm'
    )}`
  }

  return time ? (
    <Details
      data-testid="taskItem-time"
      isTaskCompleted={isTaskCompleted}
      icon={<FiClock />}
    >
      {time}
    </Details>
  ) : null
}

export default Time
