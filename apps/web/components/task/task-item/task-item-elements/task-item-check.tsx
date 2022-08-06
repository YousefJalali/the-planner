import { useUpdateTaskStatus } from '@the-planner/data'
import { Status, TaskWithProjectType } from '@the-planner/types'
import { Checkbox } from '@the-planner/ui-web'
import { formatToUrlDate } from '@the-planner/utils'
import { memo } from 'react'

export const TaskCheckbox = ({ task }: { task: TaskWithProjectType }) => {
  const {
    id,
    status,
    project: { color },
    startDate,
  } = task

  const { taskStatusHandler } = useUpdateTaskStatus({
    date: formatToUrlDate(startDate),
  })

  const checkHandler = () => {
    const newStatus =
      status === Status.PROPOSED || status === Status.INPROGRESS
        ? Status.COMPLETED
        : Status.PROPOSED

    taskStatusHandler({ taskId: id, newStatus })
  }

  return (
    <Checkbox
      id={id}
      checked={status === Status.COMPLETED}
      onChange={checkHandler}
      color={color}
    />
  )
}

export default TaskCheckbox
