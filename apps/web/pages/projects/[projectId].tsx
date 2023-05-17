import { useRouter } from 'next/router'

import { baseUrl } from '@the-planner/data'

import CreateTaskButton from '../../components/task/create-task'
import { Project } from '@the-planner/types'
import { TasksLists } from 'apps/web/components/task/tasks-list'
import { FiChevronLeft, FiPlus } from 'react-icons/fi'
import Head from 'next/head'
import { ErrorBoundary } from 'react-error-boundary'
import { GetServerSideProps } from 'next'
import { customFetch } from '@the-planner/utils'
import { SWRConfig, unstable_serialize } from 'swr'
import ProjectDetails from 'apps/web/components/project/project-details'

type FallbackProp = {
  [key: string]: {
    data: Project[]
  }
}

const Project = ({
  fallback,
  projectId,
  projectTitle,
}: {
  fallback: FallbackProp
  projectId: string
  projectTitle: string
}) => {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col bg-base-100">
      <Head>
        <title>The Planner | {projectTitle}</title>
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
      </header>

      <SWRConfig value={{ fallback }}>
        <ProjectDetails projectId={projectId} />
      </SWRConfig>

      <div className="flex justify-between items-center px-6 mt-12 mb-2">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <CreateTaskButton projectId={projectId}>
          {(showModal) => (
            <button
              className="btn btn-primary btn-sm gap-2"
              onClick={showModal}
            >
              <FiPlus size={16} />
              add task
            </button>
          )}
        </CreateTaskButton>
      </div>

      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <section className="flex-1 flex overflow-x-scroll space-x-3 scroll-pl-9 px-6 snap-x [&>div]:snap-start [&>div]:flex-[0_0_calc(100%-1.5rem)] [&>div]:max-w-md lg:overflow-x-hidden lg:[&>div]:flex-1 lg:[&>div]:max-w-none">
          <TasksLists query={{ projectId }} withDivider />
        </section>
      </ErrorBoundary>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params || typeof context.params.projectId !== 'string') {
    return { props: {} }
  }

  const { projectId } = context.params

  try {
    // const { auth_token } = cookie.parse(context.req.headers.cookie || "")

    const { data: project, error } = await customFetch(
      `${baseUrl}/api/projects?projectId=${projectId}`,
      { method: 'GET', bodyData: null }
      // { method: "GET", bodyData: null, token: auth_token }
    )

    if (error) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        fallback: {
          [unstable_serialize([
            // '/api/projects',
            `/api/projects?projectId=${projectId}`,
          ])]: {
            data: JSON.parse(JSON.stringify(project)),
          },
        },
        projectId,
        projectTitle: project.title,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default Project
