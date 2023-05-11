import { FC, useState } from 'react'
import { TaskWithProject } from '@the-planner/types'
import StatusList from './status-list'
import {
  FiArrowLeft,
  FiEdit3,
  FiList,
  FiPieChart,
  FiTrash2,
} from 'react-icons/fi'
import ViewTask from '../view-task'
import TaskOptionItem from './task-option-item'
import DeleteTask from '../delete-task'
import EditTask from '../edit-task'
import { Badge } from 'apps/web/components/ui'
import { statusAlias } from '@the-planner/utils'

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
              <TaskOptionItem
                data-testid="view-task-option"
                onClick={showModal}
                icon={<FiList />}
                content="View task"
              />
            )}
          </ViewTask>

          <TaskOptionItem
            data-testid="change-status-option"
            icon={<FiPieChart />}
            content={
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <span className="leading-tight">Status</span>
                  <Badge status={task.status} className="mb-0">
                    {statusAlias(task.status)}
                  </Badge>
                </div>

                <button
                  name="change task status"
                  className="btn btn-ghost btn-xs text-primary"
                  onClick={() => setChangeMode(true)}
                >
                  Change
                </button>
              </div>
            }
          />

          <EditTask task={task}>
            {(editHandler) => (
              <TaskOptionItem
                data-testid="edit-task-option"
                onClick={editHandler}
                icon={<FiEdit3 />}
                content="Edit task"
              />
            )}
          </EditTask>

          <DeleteTask taskId={task.id}>
            {(deleteTaskHandler) => (
              <TaskOptionItem
                data-testid="delete-task-option"
                onClick={deleteTaskHandler}
                icon={<FiTrash2 />}
                content="Delete task"
                color="text-error"
              />
            )}
          </DeleteTask>

          {/* <DeleteTaskOption taskId={task.id} /> */}
        </ul>

        {/* Status List */}
        <div>
          <button
            onClick={() => setChangeMode(false)}
            className="btn btn-sm btn-ghost btn-circle ml-2 mt-2"
          >
            <FiArrowLeft size={20} />
          </button>
          <StatusList task={task} />
        </div>
      </div>
    </div>
  )
}

export default TaskOptionsList
