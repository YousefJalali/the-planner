import randomColor from 'randomcolor'
import { useModal } from '@the-planner/hooks'
import { useCallback } from 'react'
import { ProjectForm } from '../project/project-form'
import { Project } from '@the-planner/types'

type Props = {
  onSubmit: (data: Project) => void
}

export const useProjectCreateModal = ({ onSubmit }: Props) => {
  const { setModal, clearModal } = useModal()

  const showModal = useCallback(
    () =>
      setModal({
        id: 'project-create',
        title: 'New Project',
        content: (
          <ProjectForm
            id="create"
            onSubmit={onSubmit}
            defaultValues={{ color: randomColor() }}
          />
        ),
      }),
    []
  )

  return { showModal, clearModal }
}

export default useProjectCreateModal
