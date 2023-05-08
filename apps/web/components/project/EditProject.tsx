import { useMemo } from 'react'
import { Project } from '@the-planner/types'
import { FC } from 'react'
import { useProjectEditModal } from '../modals'

type Props = {
  project: Project
}

export const EditProject: FC<Props> = ({ project }) => {
  const { showModal } = useProjectEditModal(project)

  return useMemo(
    () => (
      <button
        name="edit project"
        onClick={showModal}
        className="btn btn-ghost -mr-4 lg:btn-secondary lg:mr-0"
      >
        Edit <span className="hidden lg:inline">&nbsp;Project</span>
      </button>
    ),
    [showModal]
  )
}

export default EditProject
