import { Status } from '@the-planner/types'
import { Badge } from '../../ui'
import { formatDate, formatTime, statusAlias } from '@the-planner/utils'

type Props = {
  status: Status
  startDate: Date
  startTime: Date | null
  endDate: Date | null
  endTime: Date | null
}

const TaskDate = ({
  status,
  startDate,
  startTime,
  endDate,
  endTime,
}: Props) => {
  return (
    <section className="space-y-2 ">
      <div>
        <span className="label-text">Created On</span>

        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <span>{formatDate(startDate)}</span>
            {startTime && <span>{formatTime(startTime)}</span>}
          </div>

          <Badge status={status}>{statusAlias(status)}</Badge>
        </div>
      </div>

      {/* Due Date */}
      {endDate && (
        <div>
          <span className="label-text">Due Date</span>

          <div className="flex gap-3">
            <span>{formatDate(endDate)}</span>
            {endTime && <span>{formatTime(endTime)}</span>}
          </div>
        </div>
      )}
    </section>
  )
}

export default TaskDate
