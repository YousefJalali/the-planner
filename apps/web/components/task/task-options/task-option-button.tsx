import { Button } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import { FiMoreVertical } from 'react-icons/fi'

type Props = {
  onClick: () => void
  inHeader?: boolean
}

const TaskOptionsButton = ({ onClick, inHeader = false }: Props) => {
  return (
    <Button
      data-testid="taskItem-kebab"
      name="task options"
      onClick={onClick}
      variant="outline"
      borderRadius="full"
      mr={inHeader ? 4 : 0}
      borderColor={inHeader ? 'layout-level0accent' : 'transparent'}
      p={inHeader ? 1 : 0}
    >
      <x.span
        fontSize={inHeader ? '1.5rem' : '1.125rem'}
        color={inHeader ? 'content-contrast' : 'content-default'}
      >
        <FiMoreVertical />
      </x.span>
    </Button>
  )
}

export default TaskOptionsButton