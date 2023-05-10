type Props = {
  title: string
  description: string
  onClick: () => void
}

const TaskContent = ({ title, description, onClick }: Props) => {
  return (
    <div>
      <span className="label-text">Task</span>
      <a onClick={onClick}>
        <h2 data-testid="taskDetails-title" className="text-xl font-semibold">
          {title}
        </h2>
      </a>

      {description?.length > 0 && (
        <div className="font-text mt-2 max-h-[200px] overflow-y-scroll opacity-60 leading-relaxed">
          <p>{description}</p>
        </div>
      )}
    </div>
  )
}

export default TaskContent
