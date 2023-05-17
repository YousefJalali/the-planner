import { useInfiniteProjects } from '@the-planner/data'
import { FilterType, Status } from '@the-planner/types'
import { DynamicFlatList } from '../ui'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import SearchInput from '../search/search-input'
import { FILTERS } from './projects-filter'
import ProjectCard from './project-card'
import NewProjectCard from './new-project-card'
import ProjectCardPlaceholder from './project-card-placeholder'

const ANIMATIONS = {
  initial: { y: 300 },
  animate: { y: 0 },
  exit: { y: 300 },
}

export const ProjectCardsList = () => {
  const [filter, setFilter] = useState<FilterType>(FILTERS[0])
  const [query, setQuery] = useState<string>('')

  const router = useRouter()

  const { projects, error, isLoading, size, setSize, hasReachedEnd } =
    useInfiniteProjects(query)

  const renderProjects = useMemo(() => {
    return projects.length > 0 ? (
      projects.map((project, i) => {
        return (
          // <motion.li key={project.id} {...ANIMATIONS} className="flex-1">
          <li key={project.id} className="flex-1">
            <ProjectCard
              project={project}
              onClick={() => router.push(`/projects/${project.id}`)}
            />
          </li>
        )
      })
    ) : (
      <li className="text-sm center opacity-60">
        {filter.value === Status.COMPLETED
          ? 'No completed projects'
          : 'No projects in progress'}
      </li>
    )
  }, [projects])

  const EmptyState = () =>
    !filter ? (
      <NewProjectCard />
    ) : (
      <span className="block text-sm center opacity-60">
        {filter.value === Status.INPROGRESS
          ? 'No projects in progress'
          : 'No completed projects'}
      </span>
    )

  return (
    <>
      {/* <x.div mb={3}>
        <ProjectsFilter filter={filter} setFilter={setFilter} />
      </x.div> */}

      <div className="py-2 max-w-md">
        <SearchInput value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {isLoading ? (
        <ul className="p-1 space-y-6 md:space-y-0 md:gap-6 flex flex-col md:flex-row md:flex-wrap">
          {new Array(5).fill(0).map((e, i) => (
            <li key={i} className="flex-1">
              <ProjectCardPlaceholder />
            </li>
          ))}
        </ul>
      ) : error ? (
        <div>{error}</div>
      ) : projects && projects.length <= 0 ? (
        <EmptyState />
      ) : (
        <AnimatePresence>
          <div className="md:h-screen md:pb-[250px] md:overflow-y-scroll py-6">
            <DynamicFlatList
              dataLength={projects.length}
              next={() => setSize(size + 1)}
              hasMore={!hasReachedEnd}
            >
              <ul className="p-1 space-y-6 md:space-y-0 md:gap-6 flex flex-col md:flex-row md:flex-wrap">
                {renderProjects}
              </ul>
            </DynamicFlatList>
            <button
              className="hidden md:flex btn btn-outline mx-auto mt-6"
              onClick={() => setSize(size + 1)}
              disabled={hasReachedEnd}
            >
              load more
            </button>
          </div>
        </AnimatePresence>
      )}
    </>
  )
}

export default ProjectCardsList
