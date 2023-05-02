import { useEditProject } from '@the-planner/data'
import { Project } from '@the-planner/types'
import { memo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useProjectCreateModal, useProjectsListModal } from '../../modals'

type Props = {
  onSelectProject: (project: Project) => void
}

export const CreateProjectButton = memo(({ onSelectProject }: Props) => {
  const { showModal: showProjectsListModal } =
    useProjectsListModal(onSelectProject)

  const { onSubmit } = useEditProject(() => {
    clearModal('project-create')
    showProjectsListModal()
  })

  const { showModal, clearModal } = useProjectCreateModal({ onSubmit })

  const clickHandler = () => {
    clearModal('project-list')
    showModal()
  }

  return (
    <div className="fixed bottom-0 bg-base-100 border-t w-[calc(100%-1.5rem)]">
      <button
        className="btn btn-ghost text-primary gap-2 w-full p-0"
        onClick={clickHandler}
      >
        <FiPlus size={20} />
        Create Project
      </button>
    </div>
  )
})

export default CreateProjectButton
