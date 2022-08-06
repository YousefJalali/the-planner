import { x } from '@xstyled/styled-components'
import { Status, TaskWithProjectType } from '@the-planner/types'
import { statusAlias } from '@the-planner/utils'
import TaskItem from '../task-item/task-item'
import AnimatedItem from './animated-item'
import ListWrapper from './list-wrapper'
import { FC } from 'react'

type Props = {
  tasks: TaskWithProjectType[]
  showEmptyList?: boolean
  withDivider?: boolean
}

export const TasksLists: FC<Props> = ({
  tasks,
  showEmptyList = false,
  withDivider = false,
}) => {
  if (!tasks) return null

  return (
    <>
      {Object.values(Status).map((val) => {
        const status = Status[val]
        const filteredTasks = tasks.filter((task) => task.status === status)

        if (filteredTasks.length <= 0 && !showEmptyList) return null

        return (
          <ListWrapper
            key={status}
            withDivider={withDivider}
            status={status}
            count={filteredTasks.length}
          >
            {filteredTasks.length <= 0 && showEmptyList ? (
              <x.span
                display="block"
                textTransform="capitalize"
                color="content-subtle"
                text="body.small"
              >
                No {statusAlias(status)} tasks
              </x.span>
            ) : (
              <x.ul
                spaceY={3}
                id={`${status}-tasks-list`}
                data-testid={`${status}-tasks-list`}
              >
                <AnimatedItem<TaskWithProjectType> items={filteredTasks}>
                  {(id, item) => <TaskItem key={id} task={item} />}
                </AnimatedItem>
              </x.ul>
            )}
          </ListWrapper>
        )
      })}
    </>
  )
}

export default TasksLists
