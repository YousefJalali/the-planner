import { FC, useState } from 'react'
import { TaskWithProject } from '@the-planner/types'
import EditTaskOption from './edit-task-option'
import DeleteTaskOption from './delete-task-option'
import StatusList from './status-list'
import { FiArrowLeft } from 'react-icons/fi'
import ViewTaskOption from './view-task-option'
import ChangeStatusOption from './change-status-option'

type Props = {
  task: TaskWithProject
}

export const TaskOptionsList: FC<Props> = ({ task }) => {
  const [changeMode, setChangeMode] = useState(false)

  return (
    <div className="bg-base-100 rounded-t-2xl">
      <div
        className={`flex items-end lg:items-start transform ${
          changeMode ? '-translate-x-full' : ''
        } transition-all`}
      >
        <ul className="divide-y divide-base-200 flex-[0_0_100%]">
          <ViewTaskOption task={task} />

          <ChangeStatusOption
            status={task.status}
            changeStatus={setChangeMode}
          />

          <EditTaskOption task={task} />

          <DeleteTaskOption taskId={task.id} />
        </ul>

        <div>
          <button
            onClick={() => setChangeMode(false)}
            className="btn btn-ghost btn-circle"
          >
            <FiArrowLeft size={20} />
          </button>
          <StatusList taskId={task.id} status={task.status} />
        </div>
      </div>
    </div>
  )
}

export default TaskOptionsList
