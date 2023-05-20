import { useTasks } from '@the-planner/data'
import { SearchedTask } from '../task/task-item'
import ViewTask from '../task/view-task'

const RecentTasks = () => {
  const { tasks: recentTasks, isLoading: recentTasksLoading } = useTasks({
    limit: '5',
  })

  return (
    <section className="px-6 mt-6 prose">
      <h3 className="">Recent tasks</h3>
      {recentTasksLoading ? (
        <section className="not-prose">
          <div>Loading...</div>
        </section>
      ) : (
        recentTasks && (
          <section className="not-prose">
            <ul className="space-y-3">
              {recentTasks.map((task) => (
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
        )
      )}
    </section>
  )
}

export default RecentTasks
