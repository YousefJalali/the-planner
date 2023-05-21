import { useProject } from '@the-planner/data'
import { ErrorMessage, LinearProgress } from '../ui'
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
    <div className="px-6 flex justify-center">
      <ErrorMessage error={error} />
    </div>
  ) : !project ? (
    <div className="px-6 flex justify-center">Project not found</div>
  ) : (
    <section className="overflow-hidden px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold leading-relaxed">{project.title}</h1>
        <EditProject project={project}>
          {(showModal) => (
            <button
              onClick={showModal}
              className="btn btn-secondary btn-sm gap-2"
            >
              <FiEdit2 size={12} />
              edit
            </button>
          )}
        </EditProject>
      </div>

      {project.description?.length > 0 && (
        <div className="mb-4 max-h-[128px] overflow-y-scroll">
          <p>{project.description}</p>
        </div>
      )}

      <LinearProgress color={project.color} percentage={progress} />
    </section>
  )
}
