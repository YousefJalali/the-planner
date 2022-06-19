import styled, { x, css } from '@xstyled/styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { FC } from 'react'
import { Status, TaskWithProjectType } from '@the-planner/types'
import { statusAlias } from '@the-planner/utils'
import Tag from './Tag'
import TaskItem from './TaskItem'

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

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
  return (
    <>
      {tasks
        ? [Status.INPROGRESS, Status.PROPOSED, Status.COMPLETED].map(
            (status) => {
              const filteredTasks = tasks.filter(
                (task) => task.status === status
              )
              return filteredTasks.length > 0 ? (
                <Wrapper
                  key={status}
                  spaceY={2}
                  showDivider={showDivider}
                  status={status}
                  backgroundColor={
                    showDivider ? `tag-${status}-a10` : 'transparent'
                  }
                >
                  <Tag
                    variant={status}
                    count={filteredTasks.length}
                    textOnly={!showDivider}
                  />

                  <x.ul
                    spaceY={3}
                    id={`${status}-tasks-list`}
                    data-testid={`${status}-tasks-list`}
                  >
                    <AnimatePresence>
                      {filteredTasks.map((task) => (
                        <motion.li {...animations} key={task.id}>
                          <TaskItem key={task.id} task={task} />
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </x.ul>
                </Wrapper>
              ) : showEmptyState ? (
                <Wrapper
                  spaceY={2}
                  showDivider={showDivider}
                  status={status}
                  backgroundColor={
                    showDivider ? `tag-${status}-a10` : 'transparent'
                  }
                >
                  <Tag variant={status} count="0" textOnly={!showDivider} />

                  <x.span
                    display="block"
                    textTransform="capitalize"
                    color="content-subtle"
                    text="body.small"
                  >
                    No {statusAlias(status)} tasks
                  </x.span>
                </Wrapper>
              ) : null
            }
          )
        : null}
    </>
  )
}

export default TasksLists
