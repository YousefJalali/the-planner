import { FiCalendar } from 'react-icons/fi'
import { Status, TaskWithProject } from '@the-planner/types'
import { formatDate, statusAlias } from '@the-planner/utils'
import { Details } from './task-item-elements'
import { Badge } from '../../ui'

export const SearchedTask = ({ task }: { task: TaskWithProject }) => {
  return (
    <div
      data-testid="task-item-search"
      className="relative flex flex-col justify-between pl-6 py-2 bg-base-200 rounded-lg h-[96px] overflow-hidden"
    >
      <div
        className="absolute top-2 left-2 w-1 h-[calc(100%-1rem)] rounded-lg"
        style={{ backgroundColor: task.project.color }}
      />

      <div>
        <span className="text-sm">{task.project.title}</span>
        <h3
          className={`line-clamp-1 leading-relaxed font-semibold ${
            task.status === Status.COMPLETED ? 'line-through opacity-60' : ''
          }`}
        >
          {task.title}
        </h3>
      </div>

      <div className="flex justify-between items-center w-[calc(100%-1rem)]">
        <Details
          icon={<FiCalendar />}
          isTaskCompleted={task.status === Status.COMPLETED}
        >
          {formatDate(task.startDate)}
        </Details>
        <Badge status={task.status}>{statusAlias(task.status)}</Badge>
      </div>
    </div>
  )
}

export default SearchedTask
