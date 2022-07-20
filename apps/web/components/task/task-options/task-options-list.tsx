import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiEdit3, FiPieChart, FiTrash2 } from 'react-icons/fi'
import { Status } from '@the-planner/types'
import { Badge, Button } from '@the-planner/ui-web'
import TaskOption from './task-option'
import { statusAlias } from '@the-planner/utils'

type Props = {
  onStatusChange: () => void
  onEdit: () => void
  onDelete: () => void
  status: Status
}

const TaskOptionsList: FC<Props> = ({
  onStatusChange,
  onEdit,
  onDelete,
  status,
}) => {
  return (
    <x.ul my={1} divideY divideColor="layout-level0accent">
      <TaskOption
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
              onClick={onStatusChange}
            >
              Change
            </Button>
          </x.div>
        }
      />

      <TaskOption onClick={onEdit} icon={<FiEdit3 />} content="Edit task" />

      <TaskOption
        onClick={onDelete}
        icon={<FiTrash2 />}
        content="Delete task"
        color="utility-critical"
      />
    </x.ul>
  )
}

export default TaskOptionsList
