import { useDateTasks } from '@the-planner/data'
import { SkeletonList, TagSkeleton, TaskItemSkeleton } from '../../skeletons'

import { TasksLists } from '../tasks-list'
import DateTasksEmpty from './date-tasks-empty'
import DateTasksError from './date-tasks-error'

const DateTasksList = ({ date }: { date: string }) => {
  const { dateTasks, isLoading, error } = useDateTasks(date)

  return (
    <div className="px-6 overflow-hidden">
      {error ? (
        <DateTasksError />
      ) : isLoading ? (
        <div className="space-y-2">
          <TagSkeleton />
          <SkeletonList component={<TaskItemSkeleton />} />
        </div>
      ) : dateTasks && dateTasks.length <= 0 ? (
        <DateTasksEmpty />
      ) : (
        <TasksLists tasks={dateTasks} />
      )}
    </div>
  )
}

export default DateTasksList
