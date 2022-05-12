import { FC } from 'react'
import useCreateProject from '../../common/hooks/project/useCreateProject'
import ProjectForm from './ProjectForm'
import randomColor from 'randomcolor'

type Props = {
  onRequestClose: () => void
}

const CreateProject: FC<Props> = ({ onRequestClose }) => {
  const { onSubmit, isSubmitting } = useCreateProject(() => onRequestClose())

  return (
    <ProjectForm
      id='create'
      title='New Project'
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      onRequestClose={onRequestClose}
      defaultValues={{ color: randomColor() }}
    />
  )
}

export default CreateProject
