import { useCreateProject } from '@the-planner/data'
import { useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useProjectCreateModal } from '../../modals'

const NewProject = () => {
  const { onSubmit } = useCreateProject()
  const { showModal } = useProjectCreateModal({ onSubmit })

  return useMemo(
    () => (
      <button
        name="create project"
        onClick={showModal}
        className="btn btn-ghost btn-circle -mr-4"
      >
        <FiPlus size={24} />
      </button>
    ),
    [showModal]
  )
}

export default NewProject
