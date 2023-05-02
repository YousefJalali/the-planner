import { useDeleteProject, useEditProject } from '@the-planner/data'
import { useModal } from '@the-planner/hooks'
import { Project } from '@the-planner/types'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { ProjectForm } from '../project/project-form'

export const useProjectEditModal = (project: Project) => {
  const router = useRouter()

  const { setModal, clearModal } = useModal()

  const { onSubmit } = useEditProject(() => clearModal('project-edit'))

  const { deleteProjectHandler } = useDeleteProject(() => {
    clearModal('project-edit')
    router.back()
  })

  const showModal = useCallback(
    () =>
      setModal({
        id: 'project-edit',
        title: 'Edit Project',
        content: (
          <ProjectForm
            id="edit"
            onSubmit={onSubmit}
            defaultValues={project}
            onDelete={() => deleteProjectHandler(project)}
          />
        ),
      }),
    [project]
  )

  return { showModal }
}

export default useProjectEditModal
