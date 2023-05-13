import { Status, TaskWithProject } from '@the-planner/types'
import { statusAlias } from '@the-planner/utils'
import TaskItem from '../task-item/task-item'
import AnimatedItem from './animated-item'
import ListWrapper from './list-wrapper'
import { FC } from 'react'

type Props = {
  tasks: TaskWithProject[]
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

        // if (filteredTasks.length <= 0 && !showEmptyList) return null

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
