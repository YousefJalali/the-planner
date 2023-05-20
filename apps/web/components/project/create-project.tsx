import { useCreateProject } from '@the-planner/data'
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { ProjectForm } from './project-form'
import ProtectedComponent from '../auth/ProtectedComp'
import { Modal } from '../ui'

const CreateProject = ({ className }: { className?: string }) => {
  const [modal, showModal] = useState(false)

  const { onSubmit } = useCreateProject()

  return (
    <>
      <button
        name="create project"
        onClick={() => showModal(true)}
        className={`btn btn-primary btn-ghost btn-circle md:hidden ${className}`}
      >
        <FiPlus className="h-6 w-6" />
      </button>

      <button
        name="create project"
        onClick={() => showModal(true)}
        className={`btn gap-2 btn-ghost text-primary lg:btn-primary hidden md:flex ${className}`}
      >
        <FiPlus className="h-6 w-6" />
        Create Project
      </button>

      <Modal
        id="project-create"
        isOpen={modal}
        dismiss={() => showModal(false)}
        closeButton
      >
        <ProtectedComponent
          title="Create Project"
          description="To create a new project, you need to have an account. Please log in
          or sign up to start creating your personal projects."
        >
          <ProjectForm
            id="create"
            onSubmit={(formData) =>
              onSubmit(formData, () => {
                showModal(false)
              })
            }
          />
        </ProtectedComponent>
      </Modal>
    </>
  )
}

export default CreateProject
