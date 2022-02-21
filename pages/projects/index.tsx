import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import useSWR from 'swr'
import { ProjectType } from '../../common/types/ProjectType'
import Header from '../../components/layout/Header'
import ProjectCard from '../../components/project/ProjectCard'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import styled from 'styled-components'
import { x } from '@xstyled/styled-components'
import Icon from '../../components/Icon'

const getProjects = async () => {
  const res = await fetch('/projects')
  const data: ProjectType[] = await res.json()
  return data
}

const Index: NextPage = () => {
  const {
    data: projects,
    error: projectsError,
    mutate: mutateProjects,
  } = useSWR('/projects', getProjects)

  const router = useRouter()

  return (
    <main>
      <Header>
        <x.a onClick={() => router.push('/')}>
          <Icon icon={FiArrowLeft} size='1.5rem' />
        </x.a>

        <x.a onClick={() => console.log('create new project')}>
          <Icon icon={FiPlus} size='1.5rem' />
        </x.a>
      </Header>
      <x.main overflow='hidden' px={4}>
        <x.h1 text='headline.two' mb={3}>
          Projects
        </x.h1>
        <x.ul pb={3} spaceY={4}>
          {projects &&
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => router.push(`/projects/${project.id}`)}
              />
            ))}
        </x.ul>
      </x.main>
    </main>
  )
}

export default Index
