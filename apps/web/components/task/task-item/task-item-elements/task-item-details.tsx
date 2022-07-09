import { x } from '@xstyled/styled-components'

type Props = {
  isTaskCompleted: boolean
  children: string
  icon: JSX.Element
}
export const Details = ({
  isTaskCompleted,
  children,
  icon,
  ...props
}: Props) => (
  <x.span display="flex" alignItems="center" mt={2} {...props}>
    <x.span
      fontSize="sm"
      lineHeight="none"
      color={isTaskCompleted ? 'content-nonessential' : 'content-subtle'}
      display="flex"
    >
      {icon}
      <x.span ml={1}>{children}</x.span>
    </x.span>
  </x.span>
)

export default Details
