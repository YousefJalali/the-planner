import { FC } from 'react'
import useDeleteProject from '../../common/hooks/project/useDeleteProject'
import useEditProject from '../../common/hooks/project/useEditProject'
import { ProjectWithTasksType } from '../../common/types/ProjectType'
import ProjectForm from './ProjectForm'

type Props = {
  project: ProjectWithTasksType
  onRequestCloseAfterEdit: () => void
  onRequestCloseAfterDelete: () => void
}

const EditProject: FC<Props> = ({
  project,
  onRequestCloseAfterEdit,
  onRequestCloseAfterDelete,
}) => {
  const { onSubmit } = useEditProject(() => onRequestCloseAfterEdit())
  const { deleteProjectHandler } = useDeleteProject(() =>
    onRequestCloseAfterDelete()
  )

  return (
    <ProjectForm
      id='edit'
      title='Edit Project'
      onSubmit={onSubmit}
      // isSubmitting={isSubmitting}
      defaultValues={project}
      onRequestClose={onRequestCloseAfterEdit}
      onDelete={() => deleteProjectHandler(project)}
    />
  )
}

export default EditProject
