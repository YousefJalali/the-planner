import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { x } from '@xstyled/styled-components'
import ProjectCard from './project-card'

import NewProjectCard from './new-project-card'
import { ProjectCardSkeleton, SkeletonList } from '../../skeletons/'
import { useNotification } from '@the-planner/hooks'
import { uniqueId } from 'lodash'
import { useRecentProjects } from '@the-planner/data'
import { Button, ScrollableList } from '@the-planner/ui-web'

const ProjectsCardsList: FC = () => {
  // console.log('ProjectsCardsList rendered')

  const router = useRouter()

  const { projects, error, isLoading } = useRecentProjects()

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
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pl={4}
        pr="calc(24px - 0.5rem)"
      >
        <x.h1 text="headline.two" mb={3}>
          Projects
        </x.h1>
        {projects && projects.length > 0 && (
          <Button
            name="see all projects"
            variant="textOnly"
            color="information"
            onClick={() => router.push('/projects')}
            spaceX={2}
          >
            See all
          </Button>
        )}
      </x.div>

      {isLoading ? (
        <SkeletonList
          component={<ProjectCardSkeleton adj={24} />}
          direction="horizontal"
        />
      ) : error ? (
        <x.div px={4}>
          <NewProjectCard />
        </x.div>
      ) : projects.length === 0 ? (
        <x.div px={4}>
          <NewProjectCard />
        </x.div>
      ) : (
        <ScrollableList spaceX={4}>
          {projects.map((project) => (
            <x.li key={project.id} flex="0 0 calc(100% - 1.5rem)">
              <div />
              <ProjectCard
                project={project}
                onClick={() => router.push(`/projects/${project.id}`)}
              />
            </x.li>
          ))}
        </ScrollableList>
      )}
    </x.section>
  )
}

export default ProjectsCardsList
