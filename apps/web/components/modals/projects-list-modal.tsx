import { useModal } from '@the-planner/hooks'
import { ProjectType } from '@the-planner/types'
import { useCallback } from 'react'
import { ProjectsList } from '../project/projects-list'

export const useProjectsListModal = (
  onSelect: (project: ProjectType) => void
) => {
  const { setModal, clearModal } = useModal()

  const showModal = useCallback(
    () =>
      setModal({
        id: 'project-list',
        content: <ProjectsList onSelectProject={onSelect} />,
      }),
    [onSelect]
  )

  return { showModal, clearModal }
}

export default useProjectsListModal
