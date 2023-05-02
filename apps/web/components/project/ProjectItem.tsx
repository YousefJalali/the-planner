import { FC } from 'react'
import { Project } from '@the-planner/types'
import { FiCircle } from 'react-icons/fi'

type Props = {
  project: Project
}

const ProjectItem: FC<Props> = ({ project }) => {
  return (
    <span className="flex items-center gap-2">
      <FiCircle fill={project.color} strokeWidth={0} />
      {project.title}
    </span>
  )
}

export default ProjectItem
