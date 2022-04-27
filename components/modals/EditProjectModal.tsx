import { FC } from 'react'
import useCreateProject from '../../common/hooks/useCreateProject'
import { ProjectType } from '../../common/types/ProjectType'
import Modal from '../layout/Modal'
import ProjectForm from '../project/ProjectForm'

type Props = {
  isOpen: boolean
  onRequestClose: () => void
  project: ProjectType
}

const EditProjectModal: FC<Props> = ({ isOpen, onRequestClose, project }) => {
  const { onSubmit, isSubmitting } = useCreateProject(onRequestClose)
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      id='project-edit-modal'
    >
      <ProjectForm
        id='edit'
        title='Edit Project'
        defaultValues={project}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        onRequestClose={onRequestClose}
      />
    </Modal>
  )
}

export default EditProjectModal
