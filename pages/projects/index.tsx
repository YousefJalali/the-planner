import { NextPage } from 'next'
import { FiArrowLeft, FiLoader, FiPlus } from 'react-icons/fi'
import { useInView } from 'react-intersection-observer'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { x } from '@xstyled/styled-components'

import Header from '../../components/layout/Header'
import ProjectCard from '../../components/project/ProjectCard'
import Icon from '../../components/Icon'
import NewProjectCard from '../../components/project/NewProjectCard'

import FilterProjects from '../../components/project/FilterProjects'
import useInfiniteFetchedProjects from '../../common/data/useFetchedInfiniteProjects'
import ProjectCardSkeleton from '../../components/skeletons/ProjectCardSkeleton'
import { useModal } from '../../common/contexts/ModalCtx'
import ProjectForm from '../../components/project/ProjectForm'
import useCreateProject from '../../common/hooks/project/useCreateProject'
import CreateProject from '../../components/project/CreateProject'
import Button from '../../components/formElements/Button'

const Index: NextPage = () => {
  // const [createProjectModal, setCreateProjectModal] = useToggle()
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all')

  const { projects, error, isLoading, size, setSize, isValidating } =
    useInfiniteFetchedProjects()

  const router = useRouter()

  const { setModal, clearModal } = useModal()

  const createProjectHandler = () => {
    setModal({
      id: 'project-create',
      content: (
        <CreateProject onRequestClose={() => clearModal('project-create')} />
      ),
    })
  }

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (!isLoading && inView) {
      setSize(size + 1)
    }
  }, [inView, isLoading])

  const RenderProjects = useCallback(
    () => (
      <x.ul pb={3} spaceY={4}>
        {projects
          ?.filter((p) =>
            filter === 'completed'
              ? p.progressPercentage === 100
              : filter === 'ongoing'
              ? p.progressPercentage !== 100
              : p
          )
          .map((project) => (
            <x.li key={project.id}>
              <ProjectCard
                project={project}
                onClick={() => router.push(`/projects/${project.id}`)}
              />
            </x.li>
          ))}
      </x.ul>
    ),
    [projects, filter]
  )

  return (
    <main>
      <Header pageTitle='Projects'>
        <Button
          variant='textOnly'
          onClick={() => router.push('/')}
          // borderColor='layout-divider'
        >
          <x.span fontSize='1.5rem' color='content-contrast'>
            <FiArrowLeft />
          </x.span>
        </Button>

        <Button variant='textOnly' onClick={createProjectHandler}>
          <x.span fontSize='1.5rem' color='content-contrast'>
            <FiPlus />
          </x.span>
        </Button>
      </Header>
      <x.section overflow='hidden' px={4}>
        <x.h1 text='headline.two' mb={4}>
          Projects
        </x.h1>

        <x.div mb={3}>
          <FilterProjects active={filter} setActive={setFilter} />
        </x.div>

        {isLoading ? (
          <x.ul spaceY={4}>
            {new Array(5).fill(0).map((e, i) => (
              <x.li key={i}>
                <ProjectCardSkeleton />
              </x.li>
            ))}
          </x.ul>
        ) : projects && projects.length <= 0 ? (
          <NewProjectCard />
        ) : error ? (
          <x.div
            position='fixed'
            bottom={24}
            left={0}
            backgroundColor='layout-level0accent'
          >
            {JSON.stringify(error)}
          </x.div>
        ) : (
          <>
            <RenderProjects />
            {isValidating && (
              <x.div display='flex' justifyContent='center'>
                <Icon
                  icon={FiLoader}
                  animation='spin'
                  color='content-nonessential'
                  size='1.5rem'
                />
              </x.div>
            )}
            <x.button visibility='hidden' ref={ref}>
              load more
            </x.button>
          </>
        )}
      </x.section>
    </main>
  )
}

export default Index
