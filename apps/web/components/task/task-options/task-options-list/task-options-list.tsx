import { FC, useState } from 'react'
import { TaskWithProject } from '@the-planner/types'
import StatusList from './status-list'
import { FiArrowLeft, FiEdit3, FiList, FiTrash2 } from 'react-icons/fi'
import ChangeStatusOption from './change-status-option'
import ViewTask from '../../view-task'
import TaskOption from './task-option-item'
import DeleteTask from '../../delete-task'
import EditTask from '../../edit-task'

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
          <ViewTask task={task}>
            {(showModal) => (
              <TaskOption
                data-testid="view-task-option"
                onClick={showModal}
                icon={<FiList />}
                content="View task"
              />
            )}
          </ViewTask>

          <ChangeStatusOption
            status={task.status}
            changeStatus={setChangeMode}
          />

          <EditTask task={task}>
            {(editHandler) => (
              <TaskOption
                data-testid="edit-task-option"
                onClick={editHandler}
                icon={<FiEdit3 />}
                content="Edit task"
              />
            )}
          </EditTask>

          <DeleteTask>
            {(deleteTaskHandler) => (
              <TaskOption
                data-testid="delete-task-option"
                onClick={() => deleteTaskHandler(task.id)}
                icon={<FiTrash2 />}
                content="Delete task"
                color="text-error"
              />
            )}
          </DeleteTask>

          {/* <DeleteTaskOption taskId={task.id} /> */}
        </ul>

        <div>
          <button
            onClick={() => setChangeMode(false)}
            className="btn btn-sm btn-ghost btn-circle ml-2 mt-2"
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
