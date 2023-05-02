import { Project } from '@the-planner/types'
import { ModalHeader } from '@the-planner/ui-web'

type Props = {
  project: Partial<Project>
  onClick: () => void
  onClose?: () => void
}

const TaskProject = ({ project, onClick, onClose }: Props) => {
  return (
    <section className="flex justify-between">
      <ModalHeader onRequestClose={onClose}>
        <div className="flex">
          <div
            className="w-1 mr-2 rounded-xl"
            style={{ backgroundColor: project.color }}
          />
          <div>
            <span className="label-text">Project</span>

            <h1 className="text-2xl leading-tight font-bold" onClick={onClick}>
              {project.title}
            </h1>
          </div>
        </div>
      </ModalHeader>
    </section>
  )
}

export default TaskProject
