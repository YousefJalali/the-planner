import { x } from '@xstyled/styled-components'
import TaskItemSkeleton from '../skeletons/TaskItemSkeleton'

const SearchLoading = () => {
  return (
    <x.ul spaceY={3}>
      {new Array(5).fill(0).map((e, i) => (
        <li key={i}>
          <TaskItemSkeleton />
        </li>
      ))}
    </x.ul>
  )
}

export default SearchLoading
