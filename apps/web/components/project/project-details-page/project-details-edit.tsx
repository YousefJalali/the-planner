import { useDeleteProject, useEditProject } from '@the-planner/data'
import { useModal } from '@the-planner/hooks'
import { ProjectType } from '@the-planner/types'
import { Button } from '@the-planner/ui-web'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { ProjectForm } from '../project-form'

type Props = {
  project: ProjectType
}

export const EditProject: FC<Props> = ({ project }) => {
  const router = useRouter()

  const { setModal, clearModal } = useModal()

  const { onSubmit } = useEditProject(() => clearModal('project-edit'))

  const { deleteProjectHandler } = useDeleteProject(() => {
    clearModal('project-edit')
    router.back()
  })

  const editProjectHandler = () => {
    if (project) {
      setModal({
        id: 'project-edit',
        content: (
          <ProjectForm
            id="edit"
            title="Edit Project"
            onSubmit={onSubmit}
            defaultValues={project}
            onRequestClose={() => clearModal('project-edit')}
            onDelete={() => deleteProjectHandler(project)}
          />
        ),
      })
    }
  }
  return (
    <Button
      name="edit project"
      variant="textOnly"
      color="information"
      onClick={editProjectHandler}
      mr="calc(24px - 0.5rem)"
    >
      Edit
    </Button>
  )
}

export default EditProject
