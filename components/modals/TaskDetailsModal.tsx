import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { TaskWithProjectType } from '../../common/types/TaskType'
import Modal from '../layout/Modal'
import TaskDetails from '../task/TaskDetails'

type Props = {
  isOpen: boolean
  onRequestClose: (action: string) => void
  task: TaskWithProjectType | null
}

const TaskDetailsModal: FC<Props> = ({ isOpen, onRequestClose, task }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onRequestClose('details')}
      id='task-details-modal'
    >
      <x.div
        backgroundColor='layout-level0accent'
        borderRadius='3 3 0 0'
        overflow='hidden'
        pb={4}
      >
        {task && (
          <TaskDetails task={task} onClose={() => onRequestClose('details')} />
        )}
      </x.div>
    </Modal>
  )
}

export default TaskDetailsModal
