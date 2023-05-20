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
            <span className="text-neutral opacity-40 leading-normal">
              {placeholder}
            </span>
          )}
          <div className="flex gap-2">
            {value && isLoading && <Spinner />}

            <FiChevronDown size={20} />
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
