import { FC, useState } from 'react'
import { TaskWithProject } from '@the-planner/types'
import { FiMoreVertical } from 'react-icons/fi'
import { useMedia } from '@the-planner/hooks'
import { Dropdown, Modal } from '../../ui'
import TaskOptionsList from './task-options-list'

type Props = {
  task: TaskWithProject
  inHeader?: boolean
}

export const TaskOptions: FC<Props> = ({ task, inHeader }) => {
  const [modal, showModal] = useState(false)

  const isMobile = useMedia('(max-width: 768px)')

  return !isMobile ? (
    <Dropdown
      className="btn btn-circle btn-sm btn-ghost"
      btnComp={<FiMoreVertical size={inHeader ? 24 : 18} />}
    >
      <TaskOptionsList task={task} />
    </Dropdown>
  ) : (
    <>
      <button
        data-testid="taskItem-kebab"
        name="task options"
        onClick={() => showModal(true)}
        className={`btn btn-circle btn-sm btn-ghost ${inHeader ? '-mr-3' : ''}`}
      >
        <FiMoreVertical size={inHeader ? 24 : 18} />
      </button>

      <Modal
        id="task-options"
        isOpen={modal}
        dismiss={() => showModal(false)}
        closesWhenClickedOutside
      >
        <TaskOptionsList task={task} />
      </Modal>
    </>
  )
}

export default TaskOptions
