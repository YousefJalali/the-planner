import { FC } from 'react'
import { ProjectType } from '../../common/types/ProjectType'
import CircleProgressBar from '../CircleProgressBar'
import styled, { x } from '@xstyled/styled-components'

type Props = {
  project: ProjectType
  onClick: () => void
}

export const Card = styled.div<{ color: string }>`
  width: 100%;
  max-width: 400px;
  height: 150px;
  padding: 3;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  background: ${(props) =>
    `linear-gradient(135deg, ${props.color}0D 0%, ${props.color}4D 100%)`};
  border-radius: 3;
`

const ProjectCard: FC<Props> = ({ project, onClick }) => {
  console.log('Project Card render')

  return (
    <Card color={project.color} onClick={onClick}>
      <x.div
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        flex='0 0 calc(75% - 8px)'
      >
        <x.p color='content-contrast' fontSize='xl'>
          {project.title}
        </x.p>
        <x.p color='content-nonessential' fontSize='sm' mt={3}>
          {project.proposed + project.inprogress + project.completed} Tasks
        </x.p>
      </x.div>
      <x.div flex='0 0 25%'>
        <CircleProgressBar
          color={project.color}
          percentage={project.progressPercentage}
        />
      </x.div>
    </Card>
  )
}

export default ProjectCard
