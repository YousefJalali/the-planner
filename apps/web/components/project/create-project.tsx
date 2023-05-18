import { useCreateProject } from '@the-planner/data'
import { useModal } from '@the-planner/hooks'
import { useCallback, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { ProjectForm } from './project-form'
import ProtectedComponent from '../auth/ProtectedComp'

const CreateProject = ({ className }: { className?: string }) => {
  const { setModal, clearModal } = useModal()
  const { onSubmit } = useCreateProject()

  const showModal = useCallback(
    () =>
      setModal({
        id: 'project-create',
        closeButton: true,
        content: (
          <ProtectedComponent
            title="Create Project"
            description="To create a new project, you need to have an account. Please log in
          or sign up to start creating your personal projects."
          >
            <ProjectForm
              id="create"
              onSubmit={(formData) =>
                onSubmit(formData, () => {
                  clearModal('project-create')
                })
              }
            />
          </ProtectedComponent>
        ),
      }),
    []
  )

  return useMemo(
    () => (
      <>
        <button
          name="create project"
          onClick={showModal}
          className={`btn btn-primary btn-ghost btn-circle md:hidden ${className}`}
        >
          <FiPlus className="h-6 w-6" />
        </button>

        <button
          name="create project"
          onClick={showModal}
          className={`btn gap-2 btn-ghost text-primary lg:btn-primary hidden md:flex ${className}`}
        >
          <FiPlus className="h-6 w-6" />
          Create Project
        </button>
      </>
    ),
    [showModal]
  )
}

export default CreateProject
