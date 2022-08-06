import { useModal } from '@the-planner/hooks'
import { TaskWithProjectType } from '@the-planner/types'
import { useMemo } from 'react'
import { TaskDetails } from '../task/task-details'
import { SearchedTask } from '../task/task-item'

type Props = {
  item: TaskWithProjectType
}

const SearchItem = ({ item }: Props) => {
  const { setModal, clearModal } = useModal()

  const onDetails = (task: TaskWithProjectType) => {
    setModal({
      id: 'task-details',
      content: (
        <TaskDetails
          task={task}
          onClose={() => clearModal('task-details')}
          onRoute={() => clearModal('search-modal')}
        />
      ),
    })
  }

  return (
    <a onClick={() => onDetails(item)}>
      {useMemo(
        () => (
          <SearchedTask task={item} />
        ),
        [item]
      )}
    </a>
  )
}

export default SearchItem
