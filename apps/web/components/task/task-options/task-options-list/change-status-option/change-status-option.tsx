import { x } from '@xstyled/styled-components'
import { FiPieChart } from 'react-icons/fi'

import { useModal } from '@the-planner/hooks'
import { Badge, Button } from '@the-planner/ui-web'
import { statusAlias } from '@the-planner/utils'
import { Status } from '@the-planner/types'

import TaskOption from '../task-option-item'
import StatusList from './status-list'

type Props = {
  taskId: string
  status: Status
}

export const ChangeStatusOption = ({ taskId, status }: Props) => {
  const { setModal, clearModal } = useModal()

  const statusListModal = () => {
    clearModal('task-options')

    setModal({
      id: 'task-status',
      content: <StatusList taskId={taskId} status={status} />,
    })
  }

  return (
    <TaskOption
      data-testid="change-status-option"
      icon={<FiPieChart />}
      content={
        <x.div
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <x.div display="flex" alignItems="center">
            <x.span ml={2} mr={2} lineHeight="tight" color="content-contrast">
              Status
            </x.span>
            <Badge color={`tag-${status}`}>{statusAlias(status)}</Badge>
          </x.div>

          <Button
            name="change task status"
            variant="textOnly"
            ml={2}
            onClick={statusListModal}
          >
            Change
          </Button>
        </x.div>
      }
    />
  )
}

export default ChangeStatusOption
