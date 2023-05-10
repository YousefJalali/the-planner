import { FiChevronDown, FiCircle } from 'react-icons/fi'

import { Project } from '@the-planner/types'
import { Spinner } from '../ui'
import { useProject } from '@the-planner/data'

import { useModal } from '@the-planner/hooks'
import { useCallback } from 'react'
import ProjectsList from './projects-list'

type Props = {
  onChange: (v: string) => void
  value: string
  placeholder: string
  className?: string
}

export function SelectProject({
  value,
  onChange,
  placeholder,
  className,
}: // taskProject,
Props) {
  const { project, isLoading } = useProject(value)
  const { setModal, clearModal } = useModal()

  const showModal = useCallback(
    () =>
      setModal({
        id: 'project-list',
        closeButton: true,
        content: (
          <ProjectsList
            onSelectProject={(project) => {
              selectHandler(project)
              clearModal('project-list')
            }}
          />
        ),
      }),
    []
  )

  const selectHandler = (project: Project) => {
    if (project?.id) {
      onChange(project.id)
    }
  }

  return (
    <button type="button" onClick={showModal} className={className}>
      <div className="flex justify-between items-center">
        {project ? (
          <div className="flex items-center">
            {project.color.length > 0 && (
              <>
                <div className="mr-2 flex items-center justify-center">
                  <FiCircle fill={project.color} strokeWidth={0} size={16} />
                </div>
                <span className="leading-normal text-neutral">
                  {project.title}
                </span>
              </>
            )}
          </div>
        ) : (
          <span className="text-neutral opacity-60 leading-normal">
            {placeholder}
          </span>
        )}
        <div className="flex gap-2">
          {value && isLoading && <Spinner />}

          <FiChevronDown size={20} />
        </div>
      </div>
    </button>
  )
}

export default SelectProject
