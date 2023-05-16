import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import ProjectCard from './project-card'

import NewProjectCard from './new-project-card'
import { useNotification } from '@the-planner/hooks'
import { uniqueId } from 'lodash'
import { useProjects } from '@the-planner/data'

export const ProjectsCardsFeatured: FC = () => {
  const router = useRouter()

  // const { projects, error, isLoading } = useRecentProjects()
  const { projects, error, isLoading } = useProjects({ limit: '5' })

  const { setNotification } = useNotification()

  useEffect(() => {
    if (error) {
      setNotification({
        id: uniqueId(),
        message: 'Failed to fetch projects, try again!',
        variant: 'error',
      })
    }
  }, [error])

  return (
    <>
      <div className="flex justify-between items-center px-6 pb-1 bg-base-100 xl:sticky xl:top-0 xl:py-6 xl:pb-2 xl:z-50">
        <h1 className="text-2xl font-bold">Projects</h1>
        {projects && projects.length > 0 && !error && !isLoading && (
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
        <div className="m-6 min-w-[300px] h-[150px]">Loading...</div>
      ) : error ? (
        <div className="p-6">
          <NewProjectCard />
        </div>
      ) : projects.length === 0 ? (
        <div className="p-6">
          <NewProjectCard />
        </div>
      ) : (
        <ul className="bg-base-100 flex snap-x overflow-auto space-x-6 px-6 py-1 xl:flex-col xl:overflow-x-hidden xl:overflow-y-scroll xl:space-x-0 xl:space-y-6 [&>li]:max-w-sm">
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
    </>
  )
}

export default ProjectsCardsFeatured
