import { FC } from 'react'
import { Project } from '@the-planner/types'
import { FiCircle } from 'react-icons/fi'
import { x } from '@xstyled/styled-components'

type Props = {
  project: Project
  onClick?: () => void
}

const ProjectItem: FC<Props> = ({ project, onClick }) => {
  return (
    <x.div display="flex" alignItems="center" onClick={onClick}>
      <FiCircle fill={project.color} strokeWidth={0} />
      <x.span text="body" ml={2}>
        {project.title}
      </x.span>
    </x.div>
  )
}

export default ProjectItem
