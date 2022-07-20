import { ProjectType } from '@the-planner/types'
import { Label, ModalHeader } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'

type Props = {
  project: Partial<ProjectType>
  onClick: () => void
  onClose?: () => void
}

const TaskProject = ({ project, onClick, onClose }: Props) => {
  return (
    <x.section display="flex" justifyContent="space-between">
      <ModalHeader onRequestClose={onClose}>
        <x.div display="flex">
          <x.div
            backgroundColor={project.color}
            w="0.3rem"
            mr={2}
            borderRadius={4}
          />
          <x.div>
            <Label>Project</Label>

            <x.h1
              text="headline.three"
              lineHeight="tight"
              color="content-contrast"
              onClick={onClick}
            >
              {project.title}
            </x.h1>
          </x.div>
        </x.div>
      </ModalHeader>
    </x.section>
  )
}

export default TaskProject
