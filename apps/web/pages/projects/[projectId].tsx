import { useRouter } from 'next/router'
import { x } from '@xstyled/styled-components'

import { useProject } from '@the-planner/data'

import CreateTaskButton from '../../components/task/create-task-button'
import { Spinner, TextEditor, ErrorMessage } from '@the-planner/ui-web'
import {
  ProjectDetailsHeader,
  ProjectTitle,
  ProjectDescription,
  ProjectProgress,
  ProjectTasks,
} from '../../components/project/project-details-page'
import { Status, TaskWithProjectType } from '@the-planner/types'
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
    <x.main minHeight="100vh">
      <ProjectDetailsHeader project={project} />

      {isLoading ? (
        <x.div px={4} display="flex" justifyContent="center">
          <Spinner pathColor="brand-primary" />
        </x.div>
      ) : error ? (
        <x.div px={4} display="flex" justifyContent="center">
          <ErrorMessage error={error} />
        </x.div>
      ) : (
        project && (
          <>
            <x.section overflow="hidden" px={4}>
              <ProjectTitle title={project.title} />

              <ProjectDescription description={project.description} />

              <ProjectProgress
                projectColor={project.color}
                progress={progress}
              />
            </x.section>

            <ProjectTasks tasks={project.tasks as TaskWithProjectType[]} />
          </>
        )
      )}

      {project && <CreateTaskButton />}
    </x.main>
  )
}

export default Project
