import { NextPage } from 'next'
import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import _ from 'lodash'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { x } from '@xstyled/styled-components'

import Header from '../../components/layout/Header'
import ProjectCard from '../../components/project/ProjectCard'
import NewProjectCard from '../../components/project/NewProjectCard'

import FilterProjects, {
  filterType,
} from '../../components/project/FilterProjects'
import useInfiniteProjects from '../../common/data/useInfiniteProjects'
import ProjectCardSkeleton from '../../components/skeletons/ProjectCardSkeleton'
import { useModal } from '../../common/contexts/ModalCtx'
import CreateProject from '../../components/project/CreateProject'
import Button from '../../components/formElements/Button'
import Spinner from '../../components/Spinner'
import { AnimatePresence, motion } from 'framer-motion'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Status } from '../../common/types/TaskType'

const Index: NextPage = () => {
  const [filter, setFilter] = useState<filterType>(null)

  const { projects, error, isLoading, size, setSize, hasReachedEnd } =
    useInfiniteProjects(filter)

  const router = useRouter()

  const { setModal, clearModal } = useModal()

  const filterHandler = (filter: filterType) => {
    setFilter(filter)

    router.push(
      {
        query: filter
          ? {
              ...router.query,
              q: filter.toLowerCase(),
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
    const filteredProjects = projects?.filter((p) =>
      filter === 'completed'
        ? p.progressPercentage === 100
        : filter === 'ongoing'
        ? p.progressPercentage !== 100
        : p
    )

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
      <x.li text='body.small' textAlign='center' color='content-subtle'>
        {filter === 'completed'
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
        display='block'
        text='body.small'
        textAlign='center'
        color='content-subtle'
      >
        {filter === Status.INPROGRESS
          ? 'No projects in progress'
          : 'No completed projects'}
      </x.span>
    )

  return (
    <>
      <Header pageTitle='Projects'>
        <Button
          name='back'
          variant='outline'
          onClick={() => router.push('/')}
          ml={4}
          borderColor='layout-level0accent'
          borderRadius='full'
          p={1}
        >
          <x.span fontSize='1.5rem' color='content-contrast'>
            <FiArrowLeft />
          </x.span>
        </Button>

        <Button
          name='create project'
          variant='outline'
          onClick={createProjectHandler}
          mr={4}
          borderColor='layout-level0accent'
          borderRadius='full'
          p={1}
        >
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
          <FilterProjects active={filter} setActive={filterHandler} />
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
            <InfiniteScroll
              dataLength={projects.length}
              next={() => setSize(size + 1)}
              hasMore={!hasReachedEnd}
              loader={
                <x.div display='flex' justifyContent='center' py={3}>
                  <Spinner
                    pathColor='brand-primary'
                    trailColor='layout-level0accent'
                  />
                </x.div>
              }
              // endMessage={
              //   <p style={{ textAlign: 'center' }}>
              //     <b>Yay! You have seen it all</b>
              //   </p>
              // }
              // below props only if you need pull down functionality
              // refreshFunction={this.refresh}
              // pullDownToRefresh
              // pullDownToRefreshThreshold={50}
              // pullDownToRefreshContent={
              //   <h3 style={{ textAlign: 'center' }}>
              //     &#8595; Pull down to refresh
              //   </h3>
              // }
              // releaseToRefreshContent={
              //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
              // }
            >
              <x.ul pb={3} spaceY={4}>
                {renderProjects}
              </x.ul>
            </InfiniteScroll>
          </AnimatePresence>
        )}
      </x.section>
    </>
  )
}

export default Index
