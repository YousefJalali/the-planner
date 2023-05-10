type Props = {
  isTaskCompleted: boolean
  children: string
  icon: JSX.Element
}
export const Details = ({ isTaskCompleted, children, icon }: Props) => (
  <span className="flex items-center opacity-60 font-text mt-2">
    <span
      className="text-sm leading-none flex gap-1"
      style={{ opacity: isTaskCompleted ? '.6' : undefined }}
    >
      {icon}
      <span>{children}</span>
    </span>
  </span>
)

export default Details
