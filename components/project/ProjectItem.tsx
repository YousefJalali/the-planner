import { FC } from 'react'
import ProjectType from '../../common/types/ProjectType'
import { Text, Box } from '../../styles'
import ProjectItem from '../../styles/components/project/ProjectItemStyle'
import { Circle } from 'lucide-react'

type Props = {
  project: ProjectType
  onClick: () => void
}

const ProjectItemComp: FC<Props> = ({ project, onClick }) => {
  return (
    <Box
      as='li'
      display='flex'
      alignItems='center'
      px={3}
      py={1}
      onClick={onClick}
    >
      <Circle fill={project.color} strokeWidth={0} />
      <Text ml={1}>{project.title}</Text>
    </Box>
  )
}

export default ProjectItemComp
