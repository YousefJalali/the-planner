import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import ProjectCard from './project-card'

import NewProjectCard from './new-project-card/new-project-card'
import { ProjectCardSkeleton, SkeletonList } from '../../skeletons/'
import { useNotification } from '@the-planner/hooks'
import { uniqueId } from 'lodash'
import { useRecentProjects } from '@the-planner/data'
// import { ScrollableList } from '@the-planner/ui-web'

export const ProjectsCardsList: FC = () => {
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
    <section className="mt-12">
      <div className="flex justify-between items-center px-6 mb-1">
        <h1 className="text-2xl font-bold">Projects</h1>
        {projects && projects.length > 0 && (
          <button
            name="see all projects"
            className="btn btn-ghost btn-xs -mr-3"
            onClick={() => router.push('/projects')}
          >
            See all
          </button>
        )}
      </div>

      {isLoading ? (
        <SkeletonList
          component={<ProjectCardSkeleton adj={24} />}
          direction="horizontal"
        />
      ) : error ? (
        <div className="px-6">
          <NewProjectCard />
        </div>
      ) : projects.length === 0 ? (
        <div className="px-6">
          <NewProjectCard />
        </div>
      ) : (
        <ul className="flex snap-x overflow-x-scroll space-x-6 px-6">
          {projects.map((project) => (
            <li key={project.id} className="flex-[0_0_calc(100%-1.5rem)]">
              <ProjectCard
                project={project}
                onClick={() => router.push(`/projects/${project.id}`)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ProjectsCardsList
