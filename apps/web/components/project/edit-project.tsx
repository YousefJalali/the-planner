import { useCallback, useMemo } from 'react'
import { Project } from '@the-planner/types'
import { FC } from 'react'
import { useModal } from '@the-planner/hooks'
import { useRouter } from 'next/router'
import { useDeleteProject, useEditProject } from '@the-planner/data'
import ProjectForm from './project-form'

type Props = {
  project: Project
}

export const EditProject: FC<Props> = ({ project }) => {
  const router = useRouter()

  const { setModal, clearModal } = useModal()

  const { onSubmit } = useEditProject({ projectId: project.id })

  const { onDelete } = useDeleteProject({ projectId: project.id })
  // const { deleteProjectHandler } = useDeleteProject(() => {
  //   clearModal('project-edit')
  //   router.back()
  // })

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
                clearModal('project-edit')
                router.back()
              })
            }
          />
        ),
      }),
    [project]
  )

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
