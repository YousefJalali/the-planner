import { FC } from 'react'
import styled, { x } from '@xstyled/styled-components'
import format from 'date-fns/format'
import { FiPaperclip, FiClock } from 'react-icons/fi'

import { TaskWithProjectType, Status } from '../../common/types/TaskType'
import Icon from '../Icon'
import Checkbox from '../formElements/Checkbox'

type Props = {
  task: TaskWithProjectType
  onCheck: (task: TaskWithProjectType) => void
  onDetails: () => void
  // onOptions: () => void
  options: JSX.Element
}

export const Clickable = styled(x.a)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 101;
  user-select: none;
`

const Title = styled(x.p)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const TaskItem: FC<Props> = ({ task, onCheck, onDetails, options }) => {
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
    <x.div position='relative' data-testid='task-item'>
      {/* <Clickable onClick={onDetails} data-testid='taskItem-details' /> */}
      <x.div
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        position='relative'
        p={2}
        backgroundColor='layout-level0accent'
        borderRadius={2}
      >
        <x.a
          data-testid='taskItem-details'
          onClick={onDetails}
          display='flex'
          flexDirection='column'
          flex='0 0 calc(100% - 48px - 48px)'
          pr={1}
          userSelect='none'
        >
          {/* Title text */}
          <Title
            text='body'
            textDecoration={isTaskCompleted && 'line-through'}
            color={
              isTaskCompleted ? 'content-nonessential' : 'content-contrast'
            }
            data-testid='taskItem-title'
          >
            {task.title}
          </Title>

          {/* time & attachments */}
          <x.div display='flex'>
            {time && (
              <x.div
                display='flex'
                alignItems='center'
                mr={3}
                mt={2}
                data-testid='taskItem-time'
              >
                <Icon
                  icon={FiClock}
                  color={
                    isTaskCompleted ? 'content-nonessential' : 'content-subtle'
                  }
                  size='0.889rem'
                />
                <x.span
                  fontSize='sm'
                  lineHeight='none'
                  color={
                    isTaskCompleted ? 'content-nonessential' : 'content-subtle'
                  }
                  ml={1}
                >
                  {time}
                </x.span>
              </x.div>
            )}

            {task.attachments.length > 0 && (
              <x.div
                display='flex'
                alignItems='center'
                mt={2}
                data-testid='taskItem-attachment'
              >
                <Icon
                  icon={FiPaperclip}
                  color={
                    isTaskCompleted ? 'content-nonessential' : 'content-subtle'
                  }
                  size='0.889rem'
                />

                <x.span
                  fontSize='sm'
                  lineHeight='none'
                  color={
                    isTaskCompleted ? 'content-nonessential' : 'content-subtle'
                  }
                  ml={1}
                >
                  {attachment}
                </x.span>
              </x.div>
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
        {/* <x.div
          position='relative'
          minHeight='1.5rem'
          minWidth='1.5rem'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Clickable onClick={onOptions} data-testid='taskItem-kebab' />
          <Icon icon={FiMoreVertical} color='content-subtle' />
        </x.div> */}
      </x.div>
    </x.div>
  )
}

export default TaskItem
