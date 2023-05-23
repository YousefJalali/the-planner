import { useTasks } from '@the-planner/data'
import { SearchedTask } from '../task/task-item'
import ViewTask from '../task/view-task'
import TaskItemSearchPlaceholder from '../task/task-item/task-item-search-placeholder'
import Skeleton from 'react-loading-skeleton'

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
      ) : (
        tasks && (
          <>
            <h3>Recent tasks</h3>
            <section className="not-prose">
              <ul className="space-y-3 pb-6">
                {tasks.map((task) => (
                  <li key={task.id}>
                    <ViewTask task={task}>
                      {(showModal) => (
                        <button
                          onClick={showModal}
                          className="w-full text-left"
                        >
                          <SearchedTask task={task} />
                        </button>
                      )}
                    </ViewTask>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )
      )}
    </section>
  )
}

export default RecentTasks
