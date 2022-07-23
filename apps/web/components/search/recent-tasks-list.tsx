import { useRecentTasks } from '@the-planner/data'
import { x } from '@xstyled/styled-components'
import SearchItem from './search-item'
import SearchLoading from './search-loading'

const RecentTasks = () => {
  const { recentTasks, isLoading: recentTasksLoading } = useRecentTasks()

  return (
    <x.section px={4} mt={4}>
      <x.h2 text="body.large" mb={1}>
        Recent tasks
      </x.h2>
      {recentTasksLoading ? (
        <SearchLoading />
      ) : (
        recentTasks && (
          <x.ul spaceY={3}>
            {recentTasks.map((task) => (
              <x.li key={task.id}>
                <SearchItem item={task} />
              </x.li>
            ))}
          </x.ul>
        )
      )}
    </x.section>
  )
}

export default RecentTasks
