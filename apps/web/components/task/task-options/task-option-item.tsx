const TaskOptionItem = ({
  icon,
  onClick,
  content,
  color,
  ...props
}: {
  icon: JSX.Element
  onClick?: () => void
  content: JSX.Element | string
  color?: string
}) => (
  <li
    className="relative flex items-center px-4 min-h-[56px] gap-3 hover:bg-base-200"
    {...props}
  >
    {onClick && (
      <button
        className="absolute top-0 left-0 w-full h-full"
        onClick={onClick}
      ></button>
    )}

    <span className={`text-xl ${color}`}>{icon}</span>
    {typeof content === 'string' ? (
      <span className={`leading-tight ${color}`}>{content}</span>
    ) : (
      content
    )}
  </li>
)

export default TaskOptionItem
