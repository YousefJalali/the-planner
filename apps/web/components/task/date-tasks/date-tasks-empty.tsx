import { EmptyState, NoTasksSvg } from '@the-planner/ui-web'
import { memo } from 'react'

const DateTasksEmpty = memo(() => (
  <EmptyState
    illustration={<NoTasksSvg />}
    title="No pending tasks today"
    description=" Write down some tasks "
  />
))

export default DateTasksEmpty
