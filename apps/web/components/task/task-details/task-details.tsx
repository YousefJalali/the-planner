import { FC } from 'react'
import { useRouter } from 'next/router'
import { x } from '@xstyled/styled-components'

import { TaskWithProjectType } from '@the-planner/types'
import TaskContent from './task-content'
import TaskDate from './task-date'
import TaskProject from './task-project'
import TaskAttachments from './task-attachments'

type Props = {
  task: TaskWithProjectType
  onClose?: () => void
  onRoute?: (action?: any) => void
}

export const TaskDetails: FC<Props> = ({ task, onClose, onRoute }) => {
  const {
    id,
    title,
    project,
    projectId,
    attachments,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    status,
  } = task

  const router = useRouter()

  const linkHandler = (route: string) => {
    router.push(route)
    if (onClose) {
      onClose()
    }
    if (onRoute) {
      onRoute()
    }
  }

  return (
    <>
      <x.section px={4} mt={4} spaceY={5} mb={5}>
        {/* project */}
        <TaskProject
          project={project}
          onClick={() => linkHandler(`/projects/${projectId}`)}
          onClose={onClose}
        />

        {/* task */}
        <TaskContent
          title={title}
          description={description}
          onClick={() => linkHandler(`/tasks/${id}`)}
        />

        {/* Date & Time */}
        <TaskDate
          status={status}
          startDate={startDate}
          endDate={endDate}
          startTime={startTime}
          endTime={endTime}
        />
      </x.section>

      {/* attachments */}
      <TaskAttachments title={title} attachments={attachments} />
    </>
  )
}

export default TaskDetails
