import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import { useTask } from '@the-planner/data'
import { Spinner } from '../../components/ui'
import TaskDetails from '../../components/task/task-details'
import { TaskOptions } from '../../components/task/task-options'
import Head from 'next/head'

const TaskDetailsPage = () => {
  const router = useRouter()

  const { task, error, isLoading } = useTask(router.query.taskId as string)

  return (
    <main>
      <Head>
        <title>The Planner | {task?.title || ''}</title>
        <meta charSet="utf-8" />
      </Head>
      <header className="flex justify-between items-center px-6 p-6">
        <a
          onClick={() => router.back()}
          className="btn btn-sm btn-ghost btn-circle -ml-2"
        >
          <FiArrowLeft size={24} />
        </a>

        {task ? <TaskOptions task={task} inHeader /> : <div />}
      </header>

      {isLoading ? (
        <div className="flex justify-center px-6">
          <Spinner />
        </div>
      ) : error ? (
        <div className="flex justify-center px-6">{error}</div>
      ) : (
        task && <TaskDetails task={task} />
      )}
    </main>
  )
}

export default TaskDetailsPage
