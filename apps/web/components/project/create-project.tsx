import { useCreateProject } from '@the-planner/data'
import { useModal } from '@the-planner/hooks'
import { ReactNode, useCallback, useMemo } from 'react'
import { FiPlus } from 'react-icons/fi'
import { ProjectForm } from './project-form'

const CreateProject = ({
  children,
  className,
  noIcon,
  callback,
}: {
  children?: ReactNode
  className?: string
  noIcon?: boolean
  callback?: () => void
}) => {
  const { setModal, clearModal } = useModal()
  const { onSubmit } = useCreateProject(() => clearModal('project-create'))

  const showModal = useCallback(
    () =>
      setModal({
        id: 'project-create',
        closeButton: true,
        content: <ProjectForm id="create" onSubmit={onSubmit} />,
      }),
    []
  )

  console.log('here')

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
