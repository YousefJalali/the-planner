import { Status, TaskWithProject } from '@the-planner/types'
import { statusAlias } from '@the-planner/utils'
import TaskItem from '../task-item/task-item'
import AnimatedItem from './animated-item'
import ListWrapper from './list-wrapper'
import { FC } from 'react'
import { useTasks } from '@the-planner/data'
import TasksError from '../tasks-error'
import TaskItemPlaceholder from '../task-item/task-item-placeholder'

type Props = {
  withDivider?: boolean
  query?: {
    d?: string
    projectId?: string
  }
}

export const TasksLists: FC<Props> = ({ query, withDivider = false }) => {
  const { tasks, isLoading, error } = useTasks({
    ...(query?.d && { d: query.d }),
    ...(query?.projectId && { projectId: query.projectId }),
  })

  if (error) {
    return (
      <div>
        <TasksError />
      </div>
    )
  }

  return (
    <>
      {Object.values(Status).map((val) => {
        if (isLoading) {
          return (
            <div className="space-y-3">
              <TaskItemPlaceholder />
              <TaskItemPlaceholder />
              <TaskItemPlaceholder />
            </div>
          )
        }

        // if (tasks?.length <= 0 && val === Status.PROPOSED) {
        //   return <EmptyTasks />
        // }

        const status = Status[val]
        const filteredTasks = tasks.filter((task) => task.status === status)

        return (
          <ListWrapper
            key={status}
            withDivider={withDivider}
            status={status}
            count={filteredTasks.length}
          >
            {filteredTasks.length <= 0 ? (
              <span className="block capitalize opacity-60 text-sm bg-base-200 p-2 rounded-lg">
                No {statusAlias(status)} tasks
              </span>
            ) : (
              <ul
                className="space-y-3"
                id={`${status}-tasks-list`}
                data-testid={`${status}-tasks-list`}
              >
                <AnimatedItem<TaskWithProject> items={filteredTasks}>
                  {(id, item) => <TaskItem key={id} task={item} />}
                </AnimatedItem>
              </ul>
            )}
          </ListWrapper>
        )
      })}
    </>
  )
}

export default TasksLists
