import { FC } from 'react'
import useCreateProject from '../../common/hooks/project/useCreateProject'
import Modal from '../layout/Modal'
import ProjectForm from '../project/ProjectForm'

type Props = {
  isOpen: boolean
  onRequestClose: () => void
}

const CreateProjectModal: FC<Props> = ({ isOpen, onRequestClose }) => {
  const { onSubmit, isSubmitting } = useCreateProject(onRequestClose)

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <ProjectForm
        id='create'
        title='New Project'
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        onRequestClose={onRequestClose}
      />
    </Modal>
  )
}

export default CreateProjectModal
