import { FC } from 'react'
import { useCreateProject } from '@the-planner/data'
import { ProjectForm } from './project-form/'
import randomColor from 'randomcolor'
import { ModalHeader } from '@the-planner/ui-web'

type Props = {
  onRequestClose: () => void
}

const CreateProject: FC<Props> = ({ onRequestClose }) => {
  const { onSubmit } = useCreateProject(() => onRequestClose())

  return (
    <>
      <ModalHeader onRequestClose={onRequestClose} p={3}>
        New Project
      </ModalHeader>
      <ProjectForm
        id="create"
        title="New Project"
        onSubmit={onSubmit}
        onRequestClose={onRequestClose}
        defaultValues={{ color: randomColor() }}
      />
    </>
  )
}

export default CreateProject
