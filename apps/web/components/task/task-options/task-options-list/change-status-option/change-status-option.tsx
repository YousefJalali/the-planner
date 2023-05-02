import { x } from '@xstyled/styled-components'
import { FiPieChart } from 'react-icons/fi'

import { useModal } from '@the-planner/hooks'
import { Badge, Button } from '@the-planner/ui-web'
import { statusAlias } from '@the-planner/utils'
import { Status } from '@the-planner/types'

import TaskOption from '../task-option-item'
import { useTaskStatusModal } from 'apps/web/components/modals'

type Props = {
  taskId: string
  status: Status
}

export const ChangeStatusOption = ({ taskId, status }: Props) => {
  const { showModal } = useTaskStatusModal(taskId, status)

  const { clearModal } = useModal()

  const statusListModal = () => {
    clearModal('task-options')

    showModal()
  }

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
            className="ml-2 btn btn-ghost btn-sm text-primary"
            onClick={statusListModal}
          >
            Change
          </button>
        </div>
      }
    />
  )
}

export default ChangeStatusOption
