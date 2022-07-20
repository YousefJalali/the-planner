import { Status } from '@the-planner/types'
import { Badge, Label } from '@the-planner/ui-web'
import { formatDate, formatTime } from '@the-planner/utils'
import { x } from '@xstyled/styled-components'

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
    <x.section spaceY={2}>
      <x.div>
        <Label>Created On</Label>

        <x.div
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <x.div display="flex">
            <x.p color="content.subtle">{formatDate(startDate)}</x.p>
            {startTime && (
              <x.p color="content.subtle" ml={2}>
                {formatTime(startTime)}
              </x.p>
            )}
          </x.div>

          <Badge color={`tag-${status}`}>{status}</Badge>
        </x.div>
      </x.div>

      {/* Due Date */}
      {endDate && (
        <x.div>
          <Label>Due Date</Label>

          <x.div display="flex">
            <x.p color="content.subtle">{formatDate(endDate)}</x.p>
            {endTime && (
              <x.p color="content.subtle" ml={2}>
                {formatTime(endTime)}
              </x.p>
            )}
          </x.div>
        </x.div>
      )}
    </x.section>
  )
}

export default TaskDate
