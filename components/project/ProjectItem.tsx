import { FC } from 'react'
import { ProjectType } from '../../common/types/ProjectType'
import { FiCircle } from 'react-icons/fi'
import { x } from '@xstyled/styled-components'

type Props = {
  project: ProjectType
  onClick?: () => void
}

const ProjectItemComp: FC<Props> = ({ project, onClick }) => {
  return (
    <x.div display='flex' alignItems='center' onClick={onClick}>
      <FiCircle fill={project.color} strokeWidth={0} />
      <x.span text='body' ml={2}>
        {project.title}
      </x.span>
    </x.div>
  )
}

export default ProjectItemComp
