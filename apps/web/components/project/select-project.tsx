import { FiChevronDown, FiCircle } from 'react-icons/fi'

import { Project } from '@the-planner/types'
import { Modal, Spinner } from '../ui'
import { useProject } from '@the-planner/data'

import { useState } from 'react'
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
  const [modal, showModal] = useState(false)
  const { project, isLoading } = useProject(value)

  const selectHandler = (project: Project) => {
    if (project?.id) {
      onChange(project.id)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => showModal(true)}
        className={className}
      >
        <div className="flex justify-between items-center">
          {project ? (
            <div className="flex items-center overflow-hidden">
              {project.color.length > 0 && (
                <span className="flex items-center justify-center gap-2 leading-normal text-neutral">
                  <FiCircle fill={project.color} strokeWidth={0} size={16} />
                  <span className="line-clamp-1 first-letter:uppercase text-left">
                    {project.title}
                  </span>
                </span>
              )}
            </div>
          ) : (
            <span className="text-neutral opacity-40 leading-normal">
              {placeholder}
            </span>
          )}
          <div className="flex gap-2">
            {(value && isLoading && <Spinner />) || <FiChevronDown size={20} />}
          </div>
        </div>
      </button>

      <Modal
        id="project-list"
        isOpen={modal}
        dismiss={() => showModal(false)}
        closeButton
      >
        <ProjectsList
          onSelectProject={(project) => {
            selectHandler(project)
            showModal(false)
          }}
        />
      </Modal>
    </>
  )
}

export default SelectProject
