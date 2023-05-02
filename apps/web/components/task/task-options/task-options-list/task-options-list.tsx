import { FC } from 'react'
import { Task } from '@the-planner/types'
import { ChangeStatusOption } from './change-status-option'
import EditTaskOption from './edit-task-option'
import DeleteTaskOption from './delete-task-option'

type Props = {
  task: Task
}

export const TaskOptionsList: FC<Props> = ({ task }) => {
  return (
    <ul className="my-1 divide-y divide-base-200">
      <ChangeStatusOption taskId={task.id} status={task.status} />

      <EditTaskOption task={task} />

      <DeleteTaskOption taskId={task.id} />
    </ul>
  )
}

export default TaskOptionsList
