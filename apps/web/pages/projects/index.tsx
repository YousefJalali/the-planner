import { NextPage } from 'next'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { x } from '@xstyled/styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { Filter, DynamicFlatList } from '@the-planner/ui-web'
import { FilterType, Status } from '@the-planner/types'
import { useInfiniteProjects } from '@the-planner/data'

import ProjectCard from '../../components/project/project-card/project-card'
import { NewProjectCard } from '../../components/project/project-card/'

import { ProjectCardSkeleton, SkeletonList } from '../../components/skeletons/'

import { statusAlias } from '@the-planner/utils'
import { PageHeader } from '../../components/project/projects-page/'

const FILTERS: FilterType[] = [
  { alias: 'all', value: '' },
  { alias: statusAlias(Status.COMPLETED), value: Status.COMPLETED },
  { alias: statusAlias(Status.INPROGRESS), value: Status.INPROGRESS },
]

const Index: NextPage = () => {
  const [filter, setFilter] = useState<FilterType>(FILTERS[0])

  const { projects, error, isLoading, size, setSize, hasReachedEnd } =
    useInfiniteProjects(filter.value)

  const router = useRouter()

  const filterHandler = (filter: FilterType) => {
    setFilter(filter)

    router.push(
      {
        query: filter
          ? {
              ...router.query,
              q: filter.value.toLowerCase(),
            }
          : null,
      },
      undefined,
      { shallow: true }
    )
  }

  const animations = {
    initial: { y: 300 },
    animate: { y: 0 },
    exit: { y: 300 },
  }

  const renderProjects = useMemo(() => {
    return projects.length > 0 ? (
      projects.map((project, i) => {
        return (
          <motion.li key={project.id} {...animations}>
            <ProjectCard
              project={project}
              onClick={() => router.push(`/projects/${project.id}`)}
            />
          </motion.li>
        )
      })
    ) : (
      <x.li text="body.small" textAlign="center" color="content-subtle">
        {filter.value === Status.COMPLETED
          ? 'No completed projects'
          : 'No projects in progress'}
      </x.li>
    )
  }, [projects, filter])

  const EmptyState = () =>
    !filter ? (
      <NewProjectCard />
    ) : (
      <x.span
        display="block"
        text="body.small"
        textAlign="center"
        color="content-subtle"
      >
        {filter.value === Status.INPROGRESS
          ? 'No projects in progress'
          : 'No completed projects'}
      </x.span>
    )

  return (
    <>
      <PageHeader />

      <x.section overflow="hidden" px={4}>
        <x.h1 text="headline.two" mb={4}>
          Projects
        </x.h1>

        <x.div mb={3}>
          <Filter active={filter} setActive={filterHandler} items={FILTERS} />
        </x.div>

        {isLoading ? (
          <SkeletonList component={<ProjectCardSkeleton />} />
        ) : error ? (
          <x.div>{error}</x.div>
        ) : projects && projects.length <= 0 ? (
          <EmptyState />
        ) : (
          <AnimatePresence>
            <DynamicFlatList
              dataLength={projects.length}
              next={() => setSize(size + 1)}
              hasMore={!hasReachedEnd}
            >
              {renderProjects}
            </DynamicFlatList>
          </AnimatePresence>
        )}
      </x.section>
    </>
  )
}

export default Index
