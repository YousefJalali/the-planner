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
                    count={tasks.length}
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
                          <TaskItem
                            task={task}
                            onCheck={checkTaskHandler}
                            onDetails={() => onDetails(task)}
                            options={
                              <TaskOptions
                                task={task}
                                date={date}
                                projectId={projectId}
                              />
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
                  backgroundColor={
                    showDivider ? `tag-${status}-a10` : 'transparent'
                  }
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
            }
          )
        : null}
    </>
  )
}

export default TasksLists
