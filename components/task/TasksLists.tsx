import styled, { x, css } from '@xstyled/styled-components'
import { FC } from 'react'
import { Status, TaskWithProjectType } from '../../common/types/TaskType'
import { statusAlias } from '../../common/utils/statusAlias'
import Tag from './Tag'
import TasksList from './TasksList'

type WrapperProps = {
  status: string
  showDivider?: boolean
}
const Wrapper = styled(x.div)<WrapperProps>`
  padding-bottom: 4;

  ${(props) =>
    props.showDivider &&
    css`
      border-radius: 2;
      padding: 2;
      height: fit-content;
    `}
`

const List = ({
  status,
  tasks,
  showEmptyState,
  showDivider,
}: {
  status: Status
  tasks: TaskWithProjectType[] | null | false
  showEmptyState: boolean
  showDivider: boolean
}) =>
  tasks ? (
    <Wrapper
      spaceY={2}
      showDivider={showDivider}
      status={status}
      backgroundColor={showDivider ? `tag-${status}-a10` : 'transparent'}
    >
      <Tag variant={status} count={tasks.length} textOnly={!showDivider} />

      <TasksList id={`${status}-tasks-list`} tasks={tasks} />
    </Wrapper>
  ) : showEmptyState ? (
    <Wrapper
      spaceY={2}
      showDivider={showDivider}
      status={status}
      backgroundColor={showDivider ? `tag-${status}-a10` : 'transparent'}
    >
      <Tag variant={status} count='0' textOnly={!showDivider} />

      <x.span
        display='block'
        textTransform='capitalize'
        color='content-subtle'
        text='body.small'
      >
        No {statusAlias(status)} tasks
      </x.span>
    </Wrapper>
  ) : null

type Props = {
  tasks: TaskWithProjectType[]
  showEmptyState?: boolean
  showDivider?: boolean
}

const TasksLists: FC<Props> = ({
  tasks,
  showEmptyState = false,
  showDivider = false,
}) => {
  let inProgressTasks = null
  let proposedTasks = null
  let completedTasks = null

  if (tasks) {
    inProgressTasks = tasks.filter((task) => task.status === Status.INPROGRESS)
    proposedTasks = tasks.filter((task) => task.status === Status.PROPOSED)
    completedTasks = tasks.filter((task) => task.status === Status.COMPLETED)
  }

  return (
    <>
      <List
        status={Status.INPROGRESS}
        tasks={inProgressTasks && inProgressTasks.length > 0 && inProgressTasks}
        showEmptyState={showEmptyState}
        showDivider={showDivider}
      />
      <List
        status={Status.PROPOSED}
        tasks={proposedTasks && proposedTasks.length > 0 && proposedTasks}
        showEmptyState={showEmptyState}
        showDivider={showDivider}
      />
      <List
        status={Status.COMPLETED}
        tasks={completedTasks && completedTasks.length > 0 && completedTasks}
        showEmptyState={showEmptyState}
        showDivider={showDivider}
      />
    </>
  )
}

export default TasksLists
