type Props = {
  isTaskCompleted: boolean
  children: string
  icon: JSX.Element
}
export const Details = ({ isTaskCompleted, children, icon }: Props) => (
  <span className="flex items-center mt-2 opacity-60">
    <span
      className="text-sm leading-none flex"
      style={{ opacity: isTaskCompleted ? '.6' : undefined }}
    >
      {icon}
      <span className="ml-2">{children}</span>
    </span>
  </span>
)

export default Details
