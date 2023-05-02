import { TaskWithProject } from '@the-planner/types'
import { useTaskDetailsModal } from 'apps/web/components/modals'
import { useMemo } from 'react'

type Props = {
  task: TaskWithProject
}

export const Link = ({ task }: Props) => {
  const { showModal } = useTaskDetailsModal(task)

  return useMemo(
    () => (
      <button
        className="absolute z-10 top-0 left-0 w-full h-full select-none cursor-pointer focus:outline-none"
        onClick={showModal}
      />
    ),
    [showModal]
  )
}

export default Link
