import { FiArrowLeft, FiLoader, FiPlus } from 'react-icons/fi'
import Header from '../../components/layout/Header'
import ProjectCard from '../../components/project/ProjectCard'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { x } from '@xstyled/styled-components'
import Icon from '../../components/Icon'
import NewProjectCard from '../../components/project/NewProjectCard'
import useToggle from '../../common/hooks/useToggle'

import FilterProjects from '../../components/project/FilterProjects'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useInfiniteFetchedProjects from '../../common/data/useFetchedInfiniteProjects'
import { useInView } from 'react-intersection-observer'
import _ from 'lodash'
import CreateProjectModal from '../../components/modals/CreateProjectModal'
import ProjectCardSkeleton from '../../components/skeletons/ProjectCardSkeleton'

const Index: NextPage = () => {
  const [createProjectModal, setCreateProjectModal] = useToggle()
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all')

  const { projects, error, isLoading, size, setSize, isValidating } =
    useInfiniteFetchedProjects()

  const router = useRouter()

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
      <Header>
        <x.a onClick={() => router.push('/')}>
          <Icon icon={FiArrowLeft} size='1.5rem' />
        </x.a>

        <x.a onClick={setCreateProjectModal}>
          <Icon icon={FiPlus} size='1.5rem' />
        </x.a>
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

      <CreateProjectModal
        isOpen={createProjectModal}
        onRequestClose={setCreateProjectModal}
      />
    </main>
  )
}

export default Index
