import useSWR from 'swr'
import ProjectType from '../../common/types/ProjectType'
import { Box, Headline } from '../../styles'
import ProjectCard from './ProjectCard'

const getProjects = async () => {
  const res = await fetch('/projects')
  const data: ProjectType[] = await res.json()
  return data
}

const ProjectsList = () => {
  const { data: projects, error } = useSWR('/projects', getProjects)

  let content = <Box>loading</Box>

  if (error) {
    content = <Box>error</Box>
  }

  if (projects) {
    content = (
      <Box display='flex' overflowY='scroll' px={3}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Box>
    )
  }

  return (
    <Box as='section' mt={4}>
      <Headline level='three' px={3} mb={1}>
        Projects
      </Headline>

      {content}
    </Box>
  )
}

export default ProjectsList
