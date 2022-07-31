import { x } from '@xstyled/styled-components'

const TaskOption = ({
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
  <x.li
    display="flex"
    alignItems="center"
    px={3}
    onClick={onClick}
    minHeight={56}
    {...props}
  >
    <x.span color={color || 'content-contrast'} fontSize="1.25rem">
      {icon}
    </x.span>
    {typeof content === 'string' ? (
      <x.span ml={2} lineHeight="tight" color={color || 'content-contrast'}>
        {content}
      </x.span>
    ) : (
      content
    )}
  </x.li>
)

export default TaskOption
