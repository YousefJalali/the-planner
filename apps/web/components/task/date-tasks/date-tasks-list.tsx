import { useDateTasks } from '@the-planner/data'
import { SkeletonList, TagSkeleton, TaskItemSkeleton } from '../../skeletons'

import { TasksLists } from '../tasks-list'
import DateTasksEmpty from './date-tasks-empty'
import DateTasksError from './date-tasks-error'

const DateTasksList = ({ date }: { date: string }) => {
  const { dateTasks, isLoading, error } = useDateTasks(date)

  return (
    <div className="px-6 h-full">
      {error ? (
        <DateTasksError />
      ) : isLoading ? (
        <div className="space-y-2 py-6">
          Loading tasks...
          {/* <TagSkeleton />
          <SkeletonList component={<TaskItemSkeleton />} /> */}
        </div>
      ) : dateTasks && dateTasks.length <= 0 ? (
        <DateTasksEmpty />
      ) : (
        <section className="h-full flex flex-col md:flex-row md:space-x-4 overflow-x-hidden lg:overflow-x-visible md:[&>div]:flex-1 max-w-none">
          <TasksLists tasks={dateTasks} />
        </section>
      )}
    </div>
  )
}

export default DateTasksList
