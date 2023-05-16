import { Status, TaskWithProject } from '@the-planner/types'
import { statusAlias } from '@the-planner/utils'
import TaskItem from '../task-item/task-item'
import AnimatedItem from './animated-item'
import ListWrapper from './list-wrapper'
import { FC } from 'react'
import { useTasks } from '@the-planner/data'
import EmptyTasks from '../empty-tasks'
import TasksError from '../tasks-error'

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

  if (isLoading) {
    return <div className="py-6">Loading Tasks...</div>
  }
  if (error) {
    return (
      <div>
        <TasksError />
      </div>
    )
  }

  return tasks?.length <= 0 ? (
    <EmptyTasks />
  ) : (
    <>
      {Object.values(Status).map((val) => {
        const status = Status[val]
        const filteredTasks = tasks.filter((task) => task.status === status)

        console.log(filteredTasks)

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
            {/* <CreateTask>
              {(showModal) => (
                <button
                  onClick={showModal}
                  className="btn btn-ghost text-primary btn-sm items-center justify-center gap-2 w-full mt-2 border border-dashed border-base-300"
                >
                  <FiPlus size={20} />
                  Add task
                </button>
              )}
            </CreateTask> */}
          </ListWrapper>
        )
      })}
    </>
  )
}

export default TasksLists
