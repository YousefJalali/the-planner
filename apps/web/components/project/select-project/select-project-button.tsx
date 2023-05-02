import { Project } from '@the-planner/types'
import { useProjectsListModal } from '../../modals'
import { ReactNode } from 'react'

type Props = {
  onSelectProject: (project: Project) => void
  children: ReactNode
  className?: string
}

const SelectButton = ({ onSelectProject, children, className }: Props) => {
  const { showModal, clearModal } = useProjectsListModal((project) => {
    onSelectProject(project)
    clearModal('project-list')
  })

  return (
    <button type="button" onClick={showModal} className={className}>
      {children}
    </button>
  )
}

export default SelectButton
