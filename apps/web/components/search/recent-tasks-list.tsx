import { useRecentTasks } from '@the-planner/data'
import SearchItem from './search-item'
import SearchLoading from './search-loading'

const RecentTasks = () => {
  const { recentTasks, isLoading: recentTasksLoading } = useRecentTasks()

  return (
    <section className="px-6 mt-6 prose">
      <h3 className="">Recent tasks</h3>
      {recentTasksLoading ? (
        <section className="not-prose">
          <SearchLoading />
        </section>
      ) : (
        recentTasks && (
          <section className="not-prose">
            <ul className="space-y-3">
              {recentTasks.map((task) => (
                <li key={task.id}>
                  <SearchItem item={task} />
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
