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
    <div className="fixed bottom-0 z-10 bg-base-100 border-t w-full md:relative md:z-auto md:w-auto md:border-none">
      <button
        className="btn btn-ghost text-primary gap-2 w-full p-0 md:btn-primary md:px-2"
        onClick={clickHandler}
      >
        <FiPlus size={20} className="md:hidden" />
        Create Project
      </button>
    </div>
  )
})

export default CreateProjectButton
