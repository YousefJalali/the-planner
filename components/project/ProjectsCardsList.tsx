import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { x } from '@xstyled/styled-components'
import ProjectCard from './ProjectCard'

import NewProjectCard from './NewProjectCard'
import ScrollableList from '../ScrollableList'
import ProjectCardSkeleton from '../skeletons/ProjectCardSkeleton'
import { useNotification } from '../../common/contexts/NotificationCtx'
import { uniqueId } from 'lodash'
import SkeletonList from '../skeletons/SkeletonList'
import useFetchedRecentProjects from '../../common/data/useFetchedRecentProjects'
import Button from '../formElements/Button'
import { FiArrowRight } from 'react-icons/fi'

type Props = {
  error: string | null
  isLoading: boolean
}

const ProjectsCardsList: FC = () => {
  // console.log('ProjectsCardsList rendered')

  const router = useRouter()

  const { projects, error, isLoading } = useFetchedRecentProjects()

  const { setNotification } = useNotification()

  useEffect(() => {
    if (error) {
      setNotification({
        id: uniqueId(),
        message: 'Failed to fetch projects, try again!',
        variant: 'critical',
      })
    }
  }, [error])

  return (
    <x.section mt={6}>
      <x.div
        display='flex'
        justifyContent='space-between'
        alignItems='flex-end'
        px={4}
      >
        <x.h1 text='headline.two' mb={3}>
          Projects
        </x.h1>
        <Button
          variant='textOnly'
          color='information'
          onClick={() => router.push('/projects')}
          spaceX={2}
        >
          See all
        </Button>
      </x.div>

      {error ? (
        <NewProjectCard px={4} />
      ) : projects && projects.length <= 0 ? (
        <NewProjectCard px={4} />
      ) : (
        <ScrollableList spaceX={4}>
          {isLoading ? (
            <SkeletonList
              component={<ProjectCardSkeleton adj={24} />}
              length={5}
            />
          ) : (
            projects.slice(0, 5).map((project) => (
              <x.li key={project.id} flex='0 0 calc(100% - 1.5rem)'>
                <div />
                <ProjectCard
                  project={project}
                  onClick={() => router.push(`/projects/${project.id}`)}
                />
              </x.li>
            ))
          )}
        </ScrollableList>
      )}
    </x.section>
  )
}

export default ProjectsCardsList
