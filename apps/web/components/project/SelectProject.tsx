import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiCircle } from 'react-icons/fi'
import { ProjectType } from '../../common/types/ProjectType'
import { x } from '@xstyled/styled-components'
import _ from 'lodash'
import { useModal } from '../../common/contexts/ModalCtx'
import ProjectsList from './ProjectsList'
import CreateProject from './CreateProject'
import useProject from '../../common/data/useProject'
import { Spinner } from '@the-planner/ui-web'

type Props = {
  onChange: (v: string) => void
  value: string
  taskProject: (project: Pick<ProjectType, 'title' | 'color' | 'id'>) => void
  placeholder: string
  inputId: string
}

function SelectProject({
  value,
  onChange,
  placeholder,
  inputId,
  taskProject,
}: Props) {
  const [project, setProject] = useState<ProjectType>()

  const { setModal, clearModal } = useModal()

  const { project: fetchedProject, isLoading } = useProject(value)

  useEffect(() => {
    if (fetchedProject) {
      setProject(fetchedProject)
    }
  }, [value, fetchedProject])

  const showCreateProjectModal = () => {
    clearModal('project-list')

    setModal({
      id: 'project-create',
      content: (
        <CreateProject
          onRequestClose={() => {
            clearModal('project-create')
            showProjectsList()
          }}
        />
      ),
    })
  }

  const showProjectsList = () => {
    setModal({
      id: 'project-list',
      content: (
        <ProjectsList
          onSelect={selectHandler}
          onCreate={showCreateProjectModal}
        />
      ),
    })
  }

  const selectHandler = (project: ProjectType) => {
    onChange(project.id)

    taskProject({
      id: project.id,
      title: project.title,
      color: project.color,
    })

    clearModal('project-list')
  }

  return (
    <x.button
      type="button"
      onClick={showProjectsList}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      backgroundColor="layout-level0"
      borderRadius={2}
      id={inputId}
    >
      {project ? (
        <x.div display="flex" alignItems="center">
          {project.color.length > 0 && (
            <>
              <x.div
                mr={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FiCircle
                  fill={project.color}
                  strokeWidth={0}
                  height={16}
                  width={16}
                />
              </x.div>
              <x.span color="content-contrast" lineHeight="normal">
                {project.title}
              </x.span>
            </>
          )}
        </x.div>
      ) : (
        <x.span color="content-nonessential" lineHeight="normal">
          {placeholder}
        </x.span>
      )}
      <x.div display="flex" spaceX={2}>
        {value && isLoading && (
          <Spinner
            h={18}
            w={18}
            borderTop={2}
            border={2}
            pathColor="brand-primary"
            trailColor="layout-level0accent"
          />
        )}

        <x.span color="content-subtle" fontSize="lg">
          <FiChevronDown />
        </x.span>
      </x.div>
    </x.button>
  )
}

export default SelectProject
