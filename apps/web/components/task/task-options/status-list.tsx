import { FC } from 'react'
import { Status, TaskWithProject } from '@the-planner/types'
import { statusAlias } from '@the-planner/utils'
import EditTaskStatus from '../edit-task-status'

type Props = {
  task: TaskWithProject
}

const StatusList: FC<Props> = ({ task }) => {
  const changeHandler = (
    newStatus: Status,
    onSubmit: (task: TaskWithProject) => void
  ) =>
    onSubmit({
      ...task,
      status: newStatus,
    })

  return (
    <ul className="my-1 divide-y divide-base-200 w-screen">
      {Object.values(Status).map((val) => (
        <li key={Status[val]} className="flex items-center">
          <div className="form-control w-full">
            <label className="label cursor-pointer flex-row-reverse justify-end gap-2 p-4 hover:bg-base-200 transition-all">
              <span className="">{statusAlias(Status[val])}</span>

              <EditTaskStatus task={task}>
                {(onSubmit) => (
                  <input
                    type="radio"
                    className="radio radio-primary"
                    name="status"
                    value={Status[val]}
                    id={Status[val]}
                    checked={task.status === Status[val]}
                    onChange={() => changeHandler(Status[val], onSubmit)}
                  />
                )}
              </EditTaskStatus>
            </label>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default StatusList
