import { FC, memo } from 'react'
import { TaskWithProject, Status } from '@the-planner/types'
import { TaskOptions } from '../task-options/'
import { Time, Attachments, TaskCheckbox } from './task-item-elements'
import ViewTask from '../view-task'

type Props = {
  task: TaskWithProject
}

export const TaskItem: FC<Props> = memo(({ task }) => {
  const { title, openTask, startTime, endTime, attachments, status } = task

  // const colors = useMemo(
  //   () => ({
  //     bg: `${chroma(task?.project?.color || '#fff')
  //       .set('hsv.s', '*0.2')
  //       .set('hsv.v', '0.9')}`,
  //     text: `${chroma(task?.project?.color || '#fff').darken(2)}`,
  //   }),
  //   [task]
  // )

  return (
    <div
      data-testid="task-item"
      className="relative bg-base-200 rounded-lg hover:bg-base-300 transition-all h-fit"
    >
      {/* {task?.project?.title && searchView && (
        <span
          className="inline-block m-2 mb-0 px-2 py-1 rounded-lg text-sm"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {task.project.title}
        </span>
      )} */}

      <div className="flex justify-between items-center">
        <div
          data-testid="taskItem-details"
          className="relative flex flex-col pr-1 flex-1 p-2"
        >
          <ViewTask task={task}>
            {(showModal) => (
              <button
                onClick={showModal}
                className="absolute z-10 top-0 left-0 w-full h-full select-none cursor-pointer focus:outline-none"
              ></button>
            )}
          </ViewTask>

          <h3
            className={`font-text line-clamp-2 leading-relaxed ${
              status === Status.COMPLETED ? 'line-through opacity-60' : ''
            }`}
          >
            {title}
          </h3>

          <div className="flex gap-x-3 flex-wrap">
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
    </div>
  )
})

export default TaskItem
