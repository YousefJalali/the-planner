import { useModal } from '@the-planner/hooks'
import { TaskWithProject } from '@the-planner/types'
import { useMemo } from 'react'
import { TaskDetails } from '../task/task-details'
import { SearchedTask } from '../task/task-item'

type Props = {
  item: TaskWithProject
}

const SearchItem = ({ item }: Props) => {
  const { setModal, clearModal } = useModal()

  const onDetails = (task: TaskWithProject) => {
    setModal({
      id: 'task-details',
      closeButton: true,
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
    <button onClick={() => onDetails(item)} className="w-full text-left">
      {useMemo(
        () => (
          <SearchedTask task={item} />
        ),
        [item]
      )}
    </button>
  )
}

export default SearchItem
