import { NextPage } from 'next'
import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { x } from '@xstyled/styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, Header, Filter, DynamicFlatList } from '@the-planner/ui-web'
import { FilterType, Status } from '@the-planner/types'
import { useInfiniteProjects } from '@the-planner/data'
import { useModal } from '@the-planner/hooks'

import ProjectCard from '../../components/project/project-card/project-card'
import NewProjectCard from '../../components/project/project-card/new-project-card'

import ProjectCardSkeleton from '../../components/skeletons/ProjectCardSkeleton'
import CreateProject from '../../components/project/CreateProject'
import { statusAlias } from '@the-planner/utils'

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

  const { setModal, clearModal } = useModal()

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

  const createProjectHandler = () => {
    setModal({
      id: 'project-create',
      content: (
        <CreateProject onRequestClose={() => clearModal('project-create')} />
      ),
    })
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
      <Header pageTitle="Projects">
        <Button
          name="back"
          variant="outline"
          onClick={() => router.push('/')}
          ml={4}
          borderColor="layout-level0accent"
          borderRadius="full"
          p={1}
        >
          <x.span fontSize="1.5rem" color="content-contrast">
            <FiArrowLeft />
          </x.span>
        </Button>

        <Button
          name="create project"
          variant="outline"
          onClick={createProjectHandler}
          mr={4}
          borderColor="layout-level0accent"
          borderRadius="full"
          p={1}
        >
          <x.span fontSize="1.5rem" color="content-contrast">
            <FiPlus />
          </x.span>
        </Button>
      </Header>

      <x.section overflow="hidden" px={4}>
        <x.h1 text="headline.two" mb={4}>
          Projects
        </x.h1>

        <x.div mb={3}>
          <Filter active={filter} setActive={filterHandler} items={FILTERS} />
        </x.div>

        {isLoading ? (
          <x.ul spaceY={4}>
            {new Array(5).fill(0).map((e, i) => (
              <x.li key={i}>
                <ProjectCardSkeleton />
              </x.li>
            ))}
          </x.ul>
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
