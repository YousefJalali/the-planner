import { FC } from 'react'
import { x } from '@xstyled/styled-components'

import { TaskWithProjectType, Status } from '@the-planner/types'
import { Checkbox } from '@the-planner/ui-web'
import { TaskOptions } from '../task-options/'
import { useModal } from '@the-planner/hooks'
import { TaskDetails } from '../task-details'
import { useUpdateTaskStatus } from '@the-planner/data'
import { Title, Time, Attachments, Link } from './task-item-elements'
import format from 'date-fns/format'
import { formatToUrlDate, URL_DATE_FORMAT } from '@the-planner/utils'

type Props = {
  task: TaskWithProjectType
}

export const TaskItem: FC<Props> = ({ task }) => {
  const {
    id,
    title,
    project,
    openTask,
    startDate,
    startTime,
    endTime,
    attachments,
    status,
  } = task

  const { setModal, clearModal } = useModal()

  const { taskStatusHandler } = useUpdateTaskStatus({
    date: formatToUrlDate(startDate),
  })

  const onDetails = () => {
    setModal({
      id: 'task-details',
      content: (
        <TaskDetails task={task} onClose={() => clearModal('task-details')} />
      ),
    })
  }

  const checkTaskHandler = () => {
    const newStatus =
      status === Status.PROPOSED || status === Status.INPROGRESS
        ? Status.COMPLETED
        : Status.PROPOSED

    taskStatusHandler({ taskId: id, newStatus })
  }

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
      <Link onClick={onDetails}>
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
      </Link>

      <Checkbox
        id={id}
        checked={status === Status.COMPLETED}
        onChange={checkTaskHandler}
        color={project.color}
      />

      <TaskOptions task={task} />
    </x.div>
  )
}

export default TaskItem
