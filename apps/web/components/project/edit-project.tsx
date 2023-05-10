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

  const { onSubmit } = useEditProject(() => clearModal('project-edit'))

  const { deleteProjectHandler } = useDeleteProject(() => {
    clearModal('project-edit')
    router.back()
  })

  const showModal = useCallback(
    () =>
      setModal({
        id: 'project-edit',
        closeButton: true,
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
