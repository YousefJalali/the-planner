import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { TaskType } from '@the-planner/types'
import { ChangeStatusOption } from './change-status-option'
import EditTaskOption from './edit-task-option'
import DeleteTaskOption from './delete-task-option'

type Props = {
  task: TaskType
}

export const TaskOptionsList: FC<Props> = ({ task }) => {
  return (
    <x.ul my={1} divideY divideColor="layout-level0accent">
      <ChangeStatusOption taskId={task.id} status={task.status} />

      <EditTaskOption task={task} />

      <DeleteTaskOption taskId={task.id} />
    </x.ul>
  )
}

export default TaskOptionsList
