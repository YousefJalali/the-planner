import { Status, TaskWithProject } from '@the-planner/types'
import { useCallback, useMemo } from 'react'
import EditTaskStatus from '../../edit-task-status'

export const TaskCheckbox = ({ task }: { task: TaskWithProject }) => {
  const { id, status, project } = task

  const checkHandler = useCallback(
    (onSubmit: (task: TaskWithProject) => void) => {
      const newStatus =
        status === Status.PROPOSED || status === Status.INPROGRESS
          ? Status.COMPLETED
          : Status.PROPOSED

      onSubmit({
        ...task,
        status: newStatus,
      })
    },
    [task]
  )

  return useMemo(
    () => (
      <EditTaskStatus task={task}>
        {(onSubmit) => (
          <input
            id={id}
            type="checkbox"
            className="checkbox checkbox-accent rounded-full"
            checked={status === Status.COMPLETED}
            onChange={() => checkHandler(onSubmit)}
            style={{
              borderColor: project?.color || '#ccc',
              borderWidth: 2,
            }}
          />
        )}
      </EditTaskStatus>

      // <Checkbox
      //   id={id}
      // checked={status === Status.COMPLETED}
      // onChange={checkHandler}
      //   color={color}
      // />
    ),
    [id, status, checkHandler, project]
  )
}

export default TaskCheckbox
