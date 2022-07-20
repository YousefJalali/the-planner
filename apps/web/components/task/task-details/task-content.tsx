import { Label, TextEditor } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'

type Props = {
  title: string
  description: string
  onClick: () => void
}

const TaskContent = ({ title, description, onClick }: Props) => {
  return (
    <x.div>
      <Label>Task</Label>
      <x.a onClick={onClick}>
        <x.h2
          text="body.large"
          color="content-contrast"
          fontWeight="bold"
          data-testid="taskDetails-title"
        >
          {title}
        </x.h2>
      </x.a>

      {description?.length > 0 && (
        <x.div mt={2} maxHeight="200px" overflowY="scroll">
          <TextEditor value={description} readOnly />
        </x.div>
      )}
    </x.div>
  )
}

export default TaskContent
