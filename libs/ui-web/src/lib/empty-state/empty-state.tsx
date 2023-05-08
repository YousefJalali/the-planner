type Props = {
  illustration: JSX.Element
  title: string
  description?: string
  action?: () => void
  size?: string
}

export const EmptyState = ({
  illustration,
  title,
  description,
  action,
  size = '50%',
}: Props) => {
  return (
    <div className="flex flex-col justify-center items-center my-6">
      <div style={{ width: `${size}px` }} className="max-w-[12rem] mb-4">
        {illustration}
      </div>
      <p>{title}</p>
      <p className="opacity-60 text-sm">{description}</p>
      {action && <button name="empty-state-CTA">Add Task</button>}
    </div>
  )
}

export default EmptyState
