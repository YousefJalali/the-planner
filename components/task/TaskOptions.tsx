import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiEdit3, FiPieChart, FiTrash2 } from 'react-icons/fi'
import { Status } from '../../common/types/TaskType'
import Icon from '../Icon'
import Tag from './Tag'

type Props = {
  onStatusChange: () => void
  onEdit: () => void
  onDelete: () => void
  status: Status
}

const TaskOptions: FC<Props> = ({
  onStatusChange,
  onEdit,
  onDelete,
  status,
}) => {
  return (
    <x.ul my={1} divideY divideColor='layout-level0accent'>
      <x.li display='flex' alignItems='center' p={3}>
        <Icon icon={FiPieChart} size='1.25rem' />
        <x.div
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          w='100%'
        >
          <x.div display='flex' alignItems='center'>
            <x.span ml={2} mr={2} lineHeight='tight' color='content-contrast'>
              Status
            </x.span>
            <Tag variant={status} />
          </x.div>

          <x.a
            ml={2}
            color='brand-primary'
            text='body.small'
            onClick={onStatusChange}
          >
            Change
          </x.a>
        </x.div>
      </x.li>
      <x.li display='flex' alignItems='center' p={3} onClick={onEdit}>
        <Icon icon={FiEdit3} size='1.25rem' />
        <x.span ml={2} lineHeight='tight' color='content-contrast'>
          Edit task
        </x.span>
      </x.li>
      <x.li display='flex' alignItems='center' p={3} onClick={onDelete}>
        <Icon icon={FiTrash2} size='1.25rem' color='utility-critical' />
        <x.span ml={2} lineHeight='tight' color='utility-critical'>
          Delete task
        </x.span>
      </x.li>
    </x.ul>
  )
}

export default TaskOptions
