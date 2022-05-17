import { FC } from 'react'
import styled, { x } from '@xstyled/styled-components'
import format from 'date-fns/format'
import { FiPaperclip, FiClock } from 'react-icons/fi'

import { TaskWithProjectType, Status } from '../../common/types/TaskType'
import Checkbox from '../formElements/Checkbox'

type Props = {
  task: TaskWithProjectType
  onCheck: (task: TaskWithProjectType) => void
  onDetails: () => void
  options: JSX.Element
}

const Title = styled(x.p)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Details = ({
  isTaskCompleted,
  children,
  icon,
  ...props
}: {
  isTaskCompleted: boolean
  children: string
  icon: JSX.Element
}) => (
  <x.span display='flex' alignItems='center' mt={2} {...props}>
    <x.span
      fontSize='sm'
      lineHeight='none'
      color={isTaskCompleted ? 'content-nonessential' : 'content-subtle'}
      display='flex'
    >
      {icon}
      <x.span ml={1}>{children}</x.span>
    </x.span>
  </x.span>
)

const TaskItem: FC<Props> = ({ task, onCheck, onDetails, options }) => {
  console.log('TaskItem rendered')
  //format time
  let time = null

  if (!task.openTask && task.startTime && task.endTime) {
    time = `${format(new Date(task.startTime), 'kk:mm')} - ${format(
      new Date(task.endTime),
      'kk:mm'
    )}`
  }

  //format attachment
  const attachment =
    task.attachments.length > 1
      ? `${task.attachments.length} Files`
      : `${task.attachments.length} File`

  const isTaskCompleted = task.status === Status.COMPLETED

  return (
    <x.div
      data-testid='task-item'
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      position='relative'
      p={2}
      backgroundColor='layout-level1'
      // border='1px solid'
      // borderColor='layout-level0accent'
      borderRadius={2}
    >
      <x.a
        data-testid='taskItem-details'
        onClick={onDetails}
        display='flex'
        flexDirection='column'
        flex='0 0 calc(100% - 36px - 36px)'
        pr={1}
        userSelect='none'
      >
        {/* Title text */}
        <Title
          text='body'
          textDecoration={isTaskCompleted && 'line-through'}
          color={isTaskCompleted ? 'content-nonessential' : 'content-contrast'}
          data-testid='taskItem-title'
        >
          {task.title}
        </Title>

        {/* time & attachments */}
        <x.div display='flex' spaceX={3}>
          {time && (
            <Details
              data-testid='taskItem-time'
              isTaskCompleted={isTaskCompleted}
              icon={<FiClock />}
              children={time}
            />
          )}

          {task.attachments.length > 0 && (
            <Details
              data-testid='taskItem-attachment'
              isTaskCompleted={isTaskCompleted}
              icon={<FiPaperclip />}
              children={attachment}
            />
          )}
        </x.div>
      </x.a>

      <Checkbox
        id={task.id}
        checked={task.status === Status.COMPLETED}
        onChange={() => onCheck(task)}
        color={task.project.color}
      />

      {options}
    </x.div>
  )
}

export default TaskItem
