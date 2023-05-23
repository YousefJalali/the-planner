import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import { baseUrl } from '@the-planner/data'
import TaskDetails from '../../components/task/task-details'
import Head from 'next/head'
import { SWRConfig, unstable_serialize } from 'swr'
import { customFetch } from '@the-planner/utils'
import { GetServerSideProps } from 'next'
import { TaskWithProject } from '@the-planner/types'
import cookie from 'cookie'

type FallbackProp = {
  [key: string]: {
    data: TaskWithProject[]
  }
}

const TaskDetailsPage = ({
  fallback,
  taskId,
  taskTitle,
}: {
  fallback: FallbackProp
  taskId: string
  taskTitle: string
}) => {
  const router = useRouter()

  return (
    <main className="min-h-screen">
      <Head>
        <title>The Planner | {taskTitle}</title>
        <meta charSet="utf-8" />
      </Head>
      <header className="flex justify-between items-center px-6 p-6">
        <a
          onClick={() => router.back()}
          className="btn btn-sm btn-ghost btn-circle -ml-2"
        >
          <FiArrowLeft size={24} />
        </a>

        {/* {task ? <TaskOptions task={task} inHeader /> : <div />} */}
      </header>

      <SWRConfig value={{ fallback }}>
        <TaskDetails taskId={taskId} />
      </SWRConfig>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params || typeof context.params.taskId !== 'string') {
    return { props: {} }
  }

  const { taskId } = context.params

  try {
    const { auth_token } = cookie.parse(context.req.headers.cookie || '')

    const { data: task, error } = await customFetch(
      `${baseUrl}/api/tasks?taskId=${taskId}`,
      { method: 'GET', bodyData: null, token: auth_token }
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
            `/api/tasks?taskId=${taskId}`,
          ])]: {
            data: JSON.parse(JSON.stringify(task)),
          },
        },
        taskId,
        taskTitle: task.title,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default TaskDetailsPage
