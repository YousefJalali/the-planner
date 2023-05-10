import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import { useTask } from '@the-planner/data'
import { Spinner, Header } from '../../components/ui'
import TaskDetails from '../../components/task/task-details/task-details'
import { TaskOptions } from '../../components/task/task-options'

const TaskDetailsPage = () => {
  const router = useRouter()

  const { task, error, isLoading } = useTask(router.query.taskId as string)

  return (
    <main>
      <Header pageTitle={task ? task.title : ''} className="p-6">
        <a
          onClick={() => router.back()}
          className="btn btn-sm btn-ghost btn-circle -ml-2"
        >
          <FiArrowLeft size={24} />
        </a>

        {task ? <TaskOptions task={task} inHeader /> : <div />}
      </Header>

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
