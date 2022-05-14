import styled, { x, css } from '@xstyled/styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import { Status, TaskWithProjectType } from '../../common/types/TaskType'
import { statusAlias } from '../../common/utils/statusAlias'
import Tag from './Tag'
import useCheckTask from '../../common/hooks/task/useCheckTask'
import { useModal } from '../../common/contexts/ModalCtx'
import TaskDetails from './TaskDetails'
import TaskOptions from './TaskOptions'
// import TasksList from './TasksList'
import TaskItem from './TaskItem'

type WrapperProps = {
  status: string
  showDivider?: boolean
}

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
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
  onCheck,
  onDetails,
  date,
  projectId,
}: {
  status: Status
  tasks: TaskWithProjectType[] | null | false
  showEmptyState: boolean
  showDivider: boolean
  onCheck: (task: TaskWithProjectType) => void
  onDetails: (task: TaskWithProjectType) => void
  date?: string
  projectId?: string
}) =>
  tasks ? (
    <Wrapper
      spaceY={2}
      showDivider={showDivider}
      status={status}
      backgroundColor={showDivider ? `tag-${status}-a10` : 'transparent'}
    >
      <Tag variant={status} count={tasks.length} textOnly={!showDivider} />

      <x.ul
        spaceY={3}
        id={`${status}-tasks-list`}
        data-testid={`${status}-tasks-list`}
      >
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.li {...animations} key={task.id}>
              <TaskItem
                task={task}
                onCheck={onCheck}
                onDetails={() => onDetails(task)}
                options={
                  <TaskOptions task={task} date={date} projectId={projectId} />
                }
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </x.ul>
      {/* <TasksList id={`${status}-tasks-list`} tasks={tasks} /> */}
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
  date?: string
  projectId?: string
}

const TasksLists: FC<Props> = ({
  tasks,
  showEmptyState = false,
  showDivider = false,
  date,
  projectId,
}) => {
  const { setModal, clearModal } = useModal()

  const { checkTaskHandler } = useCheckTask(projectId || null, date || null)

  const onDetails = (task: TaskWithProjectType) => {
    setModal({
      id: 'task-details',
      content: (
        <TaskDetails task={task} onClose={() => clearModal('task-details')} />
      ),
    })
  }

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
        onCheck={checkTaskHandler}
        onDetails={onDetails}
        date={date}
        projectId={projectId}
      />
      <List
        status={Status.PROPOSED}
        tasks={proposedTasks && proposedTasks.length > 0 && proposedTasks}
        showEmptyState={showEmptyState}
        showDivider={showDivider}
        onCheck={checkTaskHandler}
        onDetails={onDetails}
        date={date}
        projectId={projectId}
      />
      <List
        status={Status.COMPLETED}
        tasks={completedTasks && completedTasks.length > 0 && completedTasks}
        showEmptyState={showEmptyState}
        showDivider={showDivider}
        onCheck={checkTaskHandler}
        onDetails={onDetails}
        date={date}
        projectId={projectId}
      />
    </>
  )
}

export default TasksLists
