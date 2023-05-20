import { TaskWithProject } from '@the-planner/types'
import { useState } from 'react'
import TaskDetails from './task-details'
import { Modal } from '../ui'

export default function ViewTask({
  children,
  task,
  className,
}: {
  children: (showModal: () => void) => JSX.Element
  task: TaskWithProject
  className?: string
}) {
  const [modal, showModal] = useState(false)

  return (
    <>
      {children(() => showModal(true))}

      <Modal
        id="task-details"
        isOpen={modal}
        dismiss={() => showModal(false)}
        closeButton
      >
        <TaskDetails taskId={task.id} />
      </Modal>
    </>
  )
}
