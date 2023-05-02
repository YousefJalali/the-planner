import { useEffect, useState } from 'react'
import { FiChevronDown, FiCircle } from 'react-icons/fi'
import { x } from '@xstyled/styled-components'

import { Project } from '@the-planner/types'
import { Spinner } from '@the-planner/ui-web'
import { useProject } from '@the-planner/data'

import SelectButton from './select-project-button'

type Props = {
  id: string
  onChange: (v: string) => void
  value: string
  taskProject: (project: Pick<Project, 'title' | 'color' | 'id'>) => void
  placeholder: string
}

export function SelectProject({
  id,
  value,
  onChange,
  placeholder,
  taskProject,
}: Props) {
  const [project, setProject] = useState<Project>()

  const { project: fetchedProject, isLoading } = useProject(value)

  useEffect(() => {
    if (fetchedProject) {
      setProject(fetchedProject)
    }
  }, [value, fetchedProject])

  const selectHandler = (project: Project) => {
    onChange(project.id)

    taskProject({
      id: project.id,
      title: project.title,
      color: project.color,
    })
  }

  return (
    <x.div
      position="relative"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      borderRadius={2}
    >
      <SelectButton id={id} onSelectProject={selectHandler} />
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
    </x.div>
  )
}

export default SelectProject
