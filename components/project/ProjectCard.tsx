import { FC } from 'react'
import ProjectType from '../../common/types/ProjectType'
import Project from '../../styles/components/project/ProjectCardStyle'
import CircleProgressBar from '../CircleProgressBar'

type Props = {
  project: ProjectType
}

const ProjectCard: FC<Props> = ({ project }) => {
  return (
    <Project.Card color={project.color}>
      <Project.Content>
        <Project.Title>{project.title}</Project.Title>
        <Project.Tasks>{project.proposed} Tasks</Project.Tasks>
      </Project.Content>
      <div>
        <CircleProgressBar
          trailStrokeColor='gray'
          strokeColor={project.color}
          percentage={project.progress}
          innerText='completed'
        />
      </div>
    </Project.Card>
  )
}

export default ProjectCard
