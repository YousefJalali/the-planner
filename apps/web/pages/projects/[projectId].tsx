import { useRouter } from 'next/router'

import { useProject } from '@the-planner/data'

import CreateTaskButton from '../../components/task/create-task'
import { ErrorMessage, LinearProgress } from '../../components/ui'
import { Status } from '@the-planner/types'
import { useMemo } from 'react'
import { TasksLists } from 'apps/web/components/task/tasks-list'
import { FiChevronLeft } from 'react-icons/fi'
import EditProject from 'apps/web/components/project/edit-project'
import Head from 'next/head'
import { ErrorBoundary } from 'react-error-boundary'

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
    <main className="min-h-screen flex flex-col">
      <Head>
        <title>The Planner | {project?.title || ''}</title>
        <meta charSet="utf-8" />
      </Head>
      <header className="flex justify-between items-center px-6 py-3">
        <a
          onClick={() => router.back()}
          className="btn btn-ghost btn-circle -ml-5 lg:w-fit lg:px-3 lg:rounded-lg lg:gap-2"
        >
          <FiChevronLeft size={24} />
          <span className="hidden lg:inline-block">Back</span>
        </a>

        <div className="flex gap-4">
          {project && !error && !isLoading && <EditProject project={project} />}
          {project && !error && !isLoading && (
            <CreateTaskButton projectId={project.id} />
          )}
        </div>
      </header>

      {isLoading ? (
        <div className="px-6 flex justify-center">Loading...</div>
      ) : error ? (
        <div className="px-6 flex justify-center">
          <ErrorMessage error={'error'} />
        </div>
      ) : (
        project && (
          <>
            <section className="overflow-hidden px-6">
              <h1 className="text-4xl font-bold leading-relaxed">
                {project.title}
              </h1>

              {project.description?.length > 0 && (
                <div className="mb-4 max-h-[128px] overflow-y-scroll">
                  <p>{project.description}</p>
                </div>
              )}

              <LinearProgress color={project.color} percentage={progress} />
            </section>

            <h1 className="text-2xl px-6 mt-12 mb-2 font-bold">Tasks</h1>

            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <section className="flex-1 flex overflow-x-scroll space-x-3 scroll-pl-9 px-6 snap-x [&>div]:snap-start [&>div]:flex-[0_0_calc(100%-1.5rem)] [&>div]:max-w-md lg:overflow-x-hidden lg:[&>div]:flex-1 lg:[&>div]:max-w-none">
                <TasksLists query={{ projectId: project.id }} withDivider />
              </section>
            </ErrorBoundary>
          </>
        )
      )}
    </main>
  )
}

export default Project
