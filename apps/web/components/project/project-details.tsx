import { useProject } from '@the-planner/data'
import { LinearProgress } from '../ui'
import { useMemo } from 'react'
import { Status } from '@the-planner/types'
import EditProject from './edit-project'
import { FiEdit2 } from 'react-icons/fi'
import ProjectDetailsPlaceholder from './project-details-placeholder'

export default function ProjectDetails({ projectId }: { projectId: string }) {
  const { project, error, isLoading } = useProject(projectId)

  const progress = useMemo(() => {
    return (
      (project &&
        +(
          (project.tasks.filter((task) => task.status === Status.COMPLETED)
            .length *
            100) /
          project._count.tasks
        ).toFixed(0)) ||
      0
    )
  }, [project])

  return isLoading ? (
    <ProjectDetailsPlaceholder />
  ) : error ? (
    <div className="px-6 text-center opacity-60">
      <span>Oops! Unable to fetch the project. Please try again later.</span>
    </div>
  ) : !project ? (
    <div className="px-6 flex justify-center">Project not found</div>
  ) : (
    <section className="overflow-hidden px-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl md:text-4xl font-bold leading-relaxed first-letter:uppercase">
          {project.title}
        </h1>
        <div className="absolute top-6 right-6">
          <EditProject project={project}>
            {(showModal) => (
              <button
                onClick={showModal}
                className="btn btn-ghost btn-sm -mr-3"
              >
                edit
              </button>
            )}
          </EditProject>
        </div>
      </div>

      {project.description?.length > 0 && (
        <div className="mb-4 relative after:content[' '] after:absolute after:bottom-0 after:left-0 after:w-full after:h-8 after:bg-gradient-to-t from-base-100">
          <p className="leading-relaxed opacity-60 font-text max-h-[116px] overflow-y-scroll pb-8">
            {project.description}
          </p>
        </div>
      )}

      <LinearProgress color={project.color} percentage={progress} />
    </section>
  )
}
