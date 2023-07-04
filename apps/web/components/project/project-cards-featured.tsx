import { FC, ReactNode } from 'react'
import { useRouter } from 'next/router'
import ProjectCard from './project-card'

import NewProjectCard from './new-project-card'
import { useProjects } from '@the-planner/data'
import ProjectCardPlaceholder from './project-card-placeholder'

const List = ({ children }: { children: ReactNode }) => (
  <ul className="scrollbar-hide bg-base-100 flex snap-x overflow-auto space-x-6 px-6 py-1 xl:flex-col xl:overflow-x-hidden xl:overflow-y-scroll xl:space-x-0 xl:space-y-6 [&>li]:max-w-sm">
    {children}
  </ul>
)

export const ProjectsCardsFeatured: FC = () => {
  const router = useRouter()

  const { projects, error, isLoading } = useProjects({ limit: '10' })

  return (
    <>
      <div className="flex justify-between items-center px-6 pb-1 bg-base-100 xl:sticky xl:top-0 xl:py-6 xl:pb-2 xl:z-50">
        <h1 className="text-2xl font-bold">Projects</h1>
        {projects && projects.length > 5 && !error && !isLoading && (
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
        <List>
          {new Array(5).fill(0).map((e, i) => (
            <li key={i} className="flex-1">
              <ProjectCardPlaceholder />
            </li>
          ))}
        </List>
      ) : error ? (
        <div className="p-6">Something went wrong</div>
      ) : projects.length === 0 ? (
        <div className="p-6">
          <NewProjectCard />
        </div>
      ) : (
        <List>
          {projects.map((project) => (
            <li key={project.id} className="flex-1">
              <ProjectCard
                project={project}
                onClick={() => router.push(`/projects/${project.id}`)}
              />
            </li>
          ))}
        </List>
      )}
    </>
  )
}

export default ProjectsCardsFeatured
