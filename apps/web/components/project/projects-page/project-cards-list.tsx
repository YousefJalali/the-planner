import { useInfiniteProjects } from '@the-planner/data'
import { FilterType, Status } from '@the-planner/types'
import { DynamicFlatList } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import SearchInput from '../../search/search-input'
import { ProjectCardSkeleton, SkeletonList } from '../../skeletons'
import { NewProjectCard, ProjectCard } from '../project-card'
import ProjectsFilter, { FILTERS } from './projects-filter'

const ANIMATIONS = {
  initial: { y: 300 },
  animate: { y: 0 },
  exit: { y: 300 },
}

export const ProjectCardsList = () => {
  const [filter, setFilter] = useState<FilterType>(FILTERS[0])
  const [search, setSearch] = useState<string>('')

  const router = useRouter()

  const { projects, error, isLoading, size, setSize, hasReachedEnd } =
    useInfiniteProjects(search)

  const renderProjects = useMemo(() => {
    return projects.length > 0 ? (
      projects.map((project, i) => {
        return (
          <motion.li key={project.id} {...ANIMATIONS}>
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
  }, [projects])

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
      {/* <x.div mb={3}>
        <ProjectsFilter filter={filter} setFilter={setFilter} />
      </x.div> */}

      <x.div mb={3}>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
    </>
  )
}

export default ProjectCardsList
