import { FC } from 'react'
import styled from 'styled-components'
import { ProjectType } from '../../common/types/ProjectType'
import { Box, Headline, Subhead, Text } from '../../styles'
import CircleProgressBar from '../CircleProgressBar'

type Props = {
  project: ProjectType
  onClick: () => void
}

const Card = styled.li<{ color: string }>`
  flex: 0 0 100%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  background: ${(props) =>
    `linear-gradient(135deg, ${props.color}0D 0%, ${props.color}4D 100%)`};
  border-radius: ${(props) => props.theme.radii[3]}px;
`

const ProjectCard: FC<Props> = ({ project, onClick }) => {
  return (
    <Card color={project.color} onClick={onClick}>
      <Box display='flex' flexDirection='column' justifyContent='space-between'>
        <Text color='content.contrast' fontSize={4}>
          {project.title}
        </Text>
        <Text color='content.nonessential' fontSize={2} mt={1}>
          {project.proposed + project.inprogress + project.completed} Tasks
        </Text>
      </Box>
      <Box flex='0 0 25%'>
        <CircleProgressBar
          strokeColor={project.color}
          percentage={project.progressPercentage}
        />
      </Box>
    </Card>
  )
}

export default ProjectCard
