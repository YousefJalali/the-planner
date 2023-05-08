import { FiList } from 'react-icons/fi'
import TaskOption from './task-option-item'
import { useTaskDetailsModal } from 'apps/web/components/modals'
import { TaskWithProject } from '@the-planner/types'

export default function ViewTaskOption({ task }: { task: TaskWithProject }) {
  const { showModal } = useTaskDetailsModal(task)

  return (
    <TaskOption
      data-testid="view-task-option"
      onClick={showModal}
      icon={<FiList />}
      content="View task"
    />
  )
}
