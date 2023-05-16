import { useCallback } from 'react'
import { Project } from '@the-planner/types'
import { useModal } from '@the-planner/hooks'
import { useRouter } from 'next/router'
import { useDeleteProject, useEditProject } from '@the-planner/data'
import ProjectForm from './project-form'

export function EditProject({
  project,
  children,
}: {
  project: Project
  children: (handler: () => void) => JSX.Element
}) {
  const router = useRouter()

  const { setModal, clearModal } = useModal()

  const { onSubmit } = useEditProject({ projectId: project.id })

  const { onDelete } = useDeleteProject({ projectId: project.id })

  const showModal = useCallback(
    () =>
      setModal({
        id: 'project-edit',
        closeButton: true,
        content: (
          <ProjectForm
            id="edit"
            onSubmit={(formData) =>
              onSubmit(formData, () => clearModal('project-edit'))
            }
            defaultValues={project}
            onDelete={() =>
              onDelete(project, () => {
                router.back()
                clearModal('project-edit')
              })
            }
          />
        ),
      }),
    [project]
  )

  return children(showModal)
}

export default EditProject
