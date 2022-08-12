import { useDateTasks } from '@the-planner/data'
import { x } from '@xstyled/styled-components'
import { SkeletonList, TagSkeleton, TaskItemSkeleton } from '../../skeletons'

import { TasksLists } from '../tasks-list'
import DateTasksEmpty from './date-tasks-empty'
import DateTasksError from './date-tasks-error'

const DateTasksList = ({ date }: { date: string }) => {
  const { dateTasks, isLoading, error } = useDateTasks(date)

  return (
    <x.div px={4} overflowX="hidden">
      {error ? (
        <DateTasksError />
      ) : isLoading ? (
        <x.div spaceY={2}>
          <TagSkeleton />
          <SkeletonList component={<TaskItemSkeleton />} />
        </x.div>
      ) : dateTasks && dateTasks.length <= 0 ? (
        <DateTasksEmpty />
      ) : (
        <TasksLists tasks={dateTasks} />
      )}
    </x.div>
  )
}

export default DateTasksList
