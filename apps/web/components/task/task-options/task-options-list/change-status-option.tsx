import { FiPieChart } from 'react-icons/fi'

import { Badge } from '../../../ui'
import { statusAlias } from '@the-planner/utils'
import { Status } from '@the-planner/types'

import TaskOption from './task-option-item'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  changeStatus: Dispatch<SetStateAction<boolean>>
  status: Status
}

export const ChangeStatusOption = ({ changeStatus, status }: Props) => {
  return (
    <TaskOption
      data-testid="change-status-option"
      icon={<FiPieChart />}
      content={
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <span className="leading-tight">Status</span>
            <Badge status={status} className="mb-0">
              {statusAlias(status)}
            </Badge>
          </div>

          <button
            name="change task status"
            className="btn btn-ghost btn-xs text-primary"
            onClick={() => changeStatus(true)}
          >
            Change
          </button>
        </div>
      }
    />
  )
}

export default ChangeStatusOption
