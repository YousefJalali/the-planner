import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiCircle } from 'react-icons/fi'
import { x } from '@xstyled/styled-components'

import { ProjectType } from '@the-planner/types'
import { useModal } from '@the-planner/hooks'
import { Spinner } from '@the-planner/ui-web'
import { useProject } from '@the-planner/data'

import { ProjectsList, CreateProjectButton } from './projects-list/'

type Props = {
  id: string
  onChange: (v: string) => void
  value: string
  taskProject: (project: Pick<ProjectType, 'title' | 'color' | 'id'>) => void
  placeholder: string
}

function SelectProject({
  id,
  value,
  onChange,
  placeholder,
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

  const showProjectsList = () => {
    setModal({
      id: 'project-list',
      content: (
        <ProjectsList
          onSelect={selectHandler}
          actionItem={<CreateProjectButton callback={showProjectsList} />}
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
      id={id}
      type="button"
      onClick={showProjectsList}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      backgroundColor="layout-level0"
      borderRadius={2}
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
