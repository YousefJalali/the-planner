import { FC, memo } from 'react'
import { x } from '@xstyled/styled-components'

import { TaskWithProjectType, Status } from '@the-planner/types'
import { TaskOptions } from '../task-options/'
import {
  Title,
  Time,
  Attachments,
  Link,
  TaskCheckbox,
} from './task-item-elements'

type Props = {
  task: TaskWithProjectType
}

export const TaskItem: FC<Props> = memo(({ task }) => {
  const { title, openTask, startTime, endTime, attachments, status } = task

  return (
    <x.div
      data-testid="task-item"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      p={2}
      backgroundColor="layout-level1"
      borderRadius={2}
    >
      <x.div
        data-testid="taskItem-details"
        position="relative"
        display="flex"
        flexDirection="column"
        flex="0 0 calc(100% - 36px - 36px)"
        pr={1}
      >
        <Link task={task} />

        <Title isTaskCompleted={status === Status.COMPLETED}>{title}</Title>

        <x.div display="flex" spaceX={3}>
          <Time
            openTask={openTask}
            startTime={startTime}
            endTime={endTime}
            status={status}
          />

          <Attachments attachments={attachments} status={status} />
        </x.div>
      </x.div>

      <TaskCheckbox task={task} />

      <TaskOptions task={task} />
    </x.div>
  )
})

export default TaskItem
