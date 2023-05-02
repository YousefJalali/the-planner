import { useCreateProject } from '@the-planner/data'
import { useProjectCreateModal } from 'apps/web/components/modals'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'

const NewProject = () => {
  const { onSubmit } = useCreateProject()
  const { showModal } = useProjectCreateModal({ onSubmit })

  return useMemo(
    () => (
      <button
        name="new project"
        onClick={showModal}
        className="btn btn-primary gap-2"
      >
        New Project
        <FiPlus size={18} />
      </button>
    ),
    [showModal]
  )
}

export default NewProject
