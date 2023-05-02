import { useUpdateTaskStatus } from '@the-planner/data'
import { Status, TaskWithProject } from '@the-planner/types'
import { formatToUrlDate } from '@the-planner/utils'
import { useCallback, useMemo } from 'react'

export const TaskCheckbox = ({ task }: { task: TaskWithProject }) => {
  const {
    id,
    status,
    project: { color },
    startDate,
  } = task

  const { taskStatusHandler } = useUpdateTaskStatus({
    date: formatToUrlDate(startDate),
  })

  const checkHandler = useCallback(() => {
    const newStatus =
      status === Status.PROPOSED || status === Status.INPROGRESS
        ? Status.COMPLETED
        : Status.PROPOSED

    taskStatusHandler({ taskId: id, newStatus })
  }, [taskStatusHandler])

  return useMemo(
    () => (
      <input
        id={id}
        type="checkbox"
        className="checkbox checkbox-secondary rounded-full"
        checked={status === Status.COMPLETED}
        onChange={checkHandler}
        style={{
          borderColor: color,
          borderWidth: 2,
        }}
      />
      // <Checkbox
      //   id={id}
      // checked={status === Status.COMPLETED}
      // onChange={checkHandler}
      //   color={color}
      // />
    ),
    [id, status, checkHandler, color]
  )
}

export default TaskCheckbox
