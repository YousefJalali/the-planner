import { x } from '@xstyled/styled-components'

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
    <x.div
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      my={5}
    >
      <x.div w={size}>{illustration}</x.div>
      <x.p text="body" mt={3} color="content-contrast">
        {title}
      </x.p>
      <x.p text="body.small" color="content-subtle">
        {description}
      </x.p>
      {action && <button name="empty-state-CTA">Add Task</button>}
    </x.div>
  )
}

export default EmptyState
