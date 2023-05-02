import { useRouter } from 'next/router'

import { useProject } from '@the-planner/data'

import CreateTaskButton from '../../components/task/create-task-button'
import { Spinner, ErrorMessage } from '@the-planner/ui-web'
import {
  ProjectDetailsHeader,
  ProjectTitle,
  ProjectDescription,
  ProjectProgress,
  ProjectTasks,
} from '../../components/project/project-details-page'
import { Status, TaskWithProject } from '@the-planner/types'
import { useMemo } from 'react'

const Project = () => {
  const router = useRouter()
  const projectId = router.query.projectId as string

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

  return (
    <main className="min-h-screen">
      <ProjectDetailsHeader project={project} />

      {isLoading ? (
        <div className="px-6 flex justify-center">
          <Spinner pathColor="brand-primary" />
        </div>
      ) : error ? (
        <div className="px-6 flex justify-center">
          <ErrorMessage error={error} />
        </div>
      ) : (
        project && (
          <>
            <section className="overflow-hidden px-6">
              <ProjectTitle title={project.title} />

              <ProjectDescription description={project.description} />

              <ProjectProgress
                projectColor={project.color}
                progress={progress}
              />
            </section>

            <ProjectTasks tasks={project.tasks as TaskWithProject[]} />
          </>
        )
      )}

      {project && <CreateTaskButton />}
    </main>
  )
}

export default Project
