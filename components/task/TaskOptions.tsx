import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiEdit3, FiPieChart, FiTrash2 } from 'react-icons/fi'
import useToggle from '../../common/hooks/useToggle'
import { Status } from '../../common/types/TaskType'
import RadioButton from '../formElements/RadioButton'
import Icon from '../Icon'
import Modal from '../layout/Modal'
import Tag from './Tag'

type Props = {
  status: Status
  onEdit: () => void
  onDelete: () => void
  onStatusChange: (status: Status) => void
}

const TaskActions: FC<Props> = ({
  status,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const [statusModal, setStatusModal] = useToggle()

  return (
    <>
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

            <x.span
              ml={2}
              color='brand-primary'
              text='body.small'
              onClick={setStatusModal}
            >
              Change
            </x.span>
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
      <Modal isOpen={statusModal} onRequestClose={setStatusModal}>
        <x.ul my={1} divideY divideColor='layout-level0accent'>
          <x.li display='flex' alignItems='center' p={3}>
            <RadioButton
              name='status'
              label={Status.PROPOSED}
              value={Status.PROPOSED}
              id={Status.PROPOSED}
              checked={status === Status.PROPOSED}
              onChange={() => onStatusChange(Status.PROPOSED)}
            />
          </x.li>
          <x.li display='flex' alignItems='center' p={3}>
            <RadioButton
              name='status'
              label={Status.INPROGRESS.replace('p', ' P')}
              value={Status.INPROGRESS}
              id={Status.INPROGRESS}
              checked={status === Status.INPROGRESS}
              onChange={() => onStatusChange(Status.INPROGRESS)}
            />
          </x.li>

          <x.li display='flex' alignItems='center' p={3}>
            <RadioButton
              name='status'
              label={Status.COMPLETED}
              value={Status.COMPLETED}
              id={Status.COMPLETED}
              checked={status === Status.COMPLETED}
              onChange={() => onStatusChange(Status.COMPLETED)}
            />
          </x.li>
        </x.ul>
      </Modal>
    </>
  )
}

export default TaskActions
