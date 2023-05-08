import { FC, memo } from 'react'
import { TaskWithProject, Status } from '@the-planner/types'
import { TaskOptions } from '../task-options/'
import { Time, Attachments, Link, TaskCheckbox } from './task-item-elements'

type Props = {
  task: TaskWithProject
}

export const TaskItem: FC<Props> = memo(({ task }) => {
  const { title, openTask, startTime, endTime, attachments, status } = task

  return (
    <div
      data-testid="task-item"
      className="flex justify-between items-center relative bg-base-200 rounded-lg hover:bg-base-300 transition-all"
    >
      <div
        data-testid="taskItem-details"
        className="relative flex flex-col pr-1 flex-1 p-2"
      >
        <Link task={task} />

        <h3
          className={`line-clamp-2 leading-relaxed ${
            status === Status.COMPLETED ? 'line-through opacity-60' : ''
          }`}
        >
          {title}
        </h3>

        <div className="flex space-y-3">
          <Time
            openTask={openTask}
            startTime={startTime}
            endTime={endTime}
            status={status}
          />

          <Attachments attachments={attachments} status={status} />
        </div>
      </div>

      <div className="flex gap-1 items-center p-2">
        <TaskCheckbox task={task} />

        <TaskOptions task={task} />
      </div>
    </div>
  )
})

export default TaskItem
