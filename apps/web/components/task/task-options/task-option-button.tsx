import { FiMoreVertical } from 'react-icons/fi'

type Props = {
  onClick: () => void
  inHeader?: boolean
}

const TaskOptionsButton = ({ onClick, inHeader = false }: Props) => {
  return (
    <button
      data-testid="taskItem-kebab"
      name="task options"
      onClick={onClick}
      className={`btn btn-circle btn-sm btn-ghost ${
        inHeader ? 'mr-6 border-base-200 p-1' : ''
      }`}
    >
      <FiMoreVertical size={18} />
    </button>
  )
}

export default TaskOptionsButton
