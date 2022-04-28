import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiCircle } from 'react-icons/fi'
import { ProjectType } from '../../common/types/ProjectType'
import { x } from '@xstyled/styled-components'
import Icon from '../Icon'
import _ from 'lodash'
import useFetchedProjects from '../../common/data/useFetchedProjects'
import { useModal } from '../../common/contexts/ModalCtx'
import ProjectsList from './ProjectsList'

type Props = {
  onChange: (v: string) => void
  value: string
  placeholder: string
  id?: string
  createProject: () => void
}

function SelectProject({
  value,
  onChange,
  placeholder,
  id,
  createProject,
}: Props) {
  const [project, setProject] = useState<ProjectType>()

  const { setModal, clearModal } = useModal()

  const {
    projects,
    setProjects,
    error: projectsError,
    isLoading: isProjectsLoading,
  } = useFetchedProjects()

  useEffect(() => {
    if (projects) {
      const findProject = projects.find((p) => p.id === value)
      setProject(findProject)
    }
  }, [value, projects])

  const onItemClickHandler = (id: string) => {
    onChange(id)
    clearModal('project-list')
  }

  const onShowList = () => {
    setModal({
      id: 'project-list',
      content: (
        <ProjectsList
          onItemClick={onItemClickHandler}
          onCreate={createProject}
          projects={projects}
        />
      ),
    })
  }

  return (
    <x.button
      type='button'
      onClick={onShowList}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      w='100%'
      backgroundColor='layout-level0'
      borderRadius={2}
      id={id}
    >
      {project ? (
        <x.div display='flex' alignItems='center'>
          {project.color.length > 0 && (
            <>
              <x.div
                mr={2}
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                <FiCircle
                  fill={project.color}
                  strokeWidth={0}
                  height={16}
                  width={16}
                />
              </x.div>
              <x.span color='content-contrast' lineHeight='normal'>
                {project.title}
              </x.span>
            </>
          )}
        </x.div>
      ) : (
        <x.span color='content-nonessential' lineHeight='normal'>
          {placeholder}
        </x.span>
      )}
      <Icon icon={FiChevronDown} size='1rem' color='content-subtle' />
    </x.button>
  )
}

export default SelectProject
