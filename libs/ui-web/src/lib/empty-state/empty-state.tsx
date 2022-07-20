import { Button } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'

type Props = {
  illustration: JSX.Element
  title: string
  description: string
  action?: () => void
}

export const EmptyState = ({
  illustration,
  title,
  description,
  action,
}: Props) => {
  return (
    <x.div
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      my={5}
    >
      <x.div w="50%">{illustration}</x.div>
      <x.p text="body" mt={3} color="content-contrast">
        {title}
      </x.p>
      <x.p text="body.small" color="content-subtle">
        {description}
      </x.p>
      {action && (
        <Button name="empty-state-CTA" mt={2}>
          Add Task
        </Button>
      )}
    </x.div>
  )
}

export default EmptyState
