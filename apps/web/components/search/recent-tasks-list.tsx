import { useTasks } from '@the-planner/data'
import { SearchedTask } from '../task/task-item'
import ViewTask from '../task/view-task'
import TaskItemSearchPlaceholder from '../task/task-item/task-item-search-placeholder'
import Skeleton from 'react-loading-skeleton'
import { HiOutlineLightBulb } from 'react-icons/hi'
import CreateTask from '../task/create-task'
import { FiPlus } from 'react-icons/fi'

const RecentTasks = () => {
  const { tasks, isLoading } = useTasks({
    limit: '5',
  })

  return (
    <section className="px-6 mt-6 prose">
      {isLoading ? (
        <>
          <h3>
            <Skeleton width={150} />
          </h3>
          <section className="not-prose">
            <ul className="space-y-3 pb-6">
              {new Array(5).fill(0).map((ele, i) => (
                <li key={i}>
                  <TaskItemSearchPlaceholder />
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : tasks && tasks.length > 0 ? (
        <>
          <h3>Recent tasks</h3>
          <section className="not-prose">
            <ul className="space-y-3 pb-6">
              {tasks.map((task) => (
                <li key={task.id}>
                  <ViewTask task={task}>
                    {(showModal) => (
                      <button onClick={showModal} className="w-full text-left">
                        <SearchedTask task={task} />
                      </button>
                    )}
                  </ViewTask>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-center">
            <HiOutlineLightBulb size={48} className="mx-auto mb-2" />
            Creating an account and starting to add tasks will empower you to
            seize control of your time, set clear goals, celebrate your
            progress, stay organized, and reduce stress.
          </p>
          <CreateTask>
            {(showModal) => (
              <button onClick={showModal} className="btn btn-primary gap-2">
                <FiPlus size={20} />
                New Task
              </button>
            )}
          </CreateTask>
        </div>
      )}
    </section>
  )
}

export default RecentTasks
