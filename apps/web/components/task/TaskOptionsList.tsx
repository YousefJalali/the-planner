import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiEdit3, FiPieChart, FiTrash2 } from 'react-icons/fi'
import { Status } from '@the-planner/types'
import Button from '../formElements/Button'
import Tag from './Tag'

type Props = {
  onStatusChange: () => void
  onEdit: () => void
  onDelete: () => void
  status: Status
}

const Item = ({
  icon,
  onClick,
  content,
  color,
}: {
  icon: JSX.Element
  onClick?: () => void
  content: JSX.Element | string
  color?: string
}) => (
  <x.li
    display="flex"
    alignItems="center"
    px={3}
    onClick={onClick}
    minHeight={56}
  >
    <x.span color={color || 'content-contrast'} fontSize="1.25rem">
      {icon}
    </x.span>
    {typeof content === 'string' ? (
      <x.span ml={2} lineHeight="tight" color={color || 'content-contrast'}>
        {content}
      </x.span>
    ) : (
      content
    )}
  </x.li>
)

const TaskOptionsList: FC<Props> = ({
  onStatusChange,
  onEdit,
  onDelete,
  status,
}) => {
  return (
    <x.ul my={1} divideY divideColor="layout-level0accent">
      <Item
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
              <Tag variant={status} />
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

      <Item onClick={onEdit} icon={<FiEdit3 />} content="Edit task" />

      <Item
        onClick={onDelete}
        icon={<FiTrash2 />}
        content="Delete task"
        color="utility-critical"
      />
    </x.ul>
  )
}

export default TaskOptionsList
