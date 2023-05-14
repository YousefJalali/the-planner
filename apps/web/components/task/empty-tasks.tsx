import { EmptyState, NoTasksSvg } from '../ui'
import { memo } from 'react'

const EmptyTasks = memo(() => (
  <EmptyState
    illustration={<NoTasksSvg />}
    title="No pending tasks"
    description=" Write down some tasks "
  />
))

export default EmptyTasks
