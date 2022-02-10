import { ArrowLeft, Plus } from 'lucide-react'
import useSWR from 'swr'
import { ProjectType } from '../../common/types/ProjectType'
import Header from '../../components/layout/Header'
import ProjectCard from '../../components/project/ProjectCard'
import { Box, Headline, Text } from '../../styles'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import styled from 'styled-components'

const List = styled(Box)`
  > li {
    &:not(:last-child) {
      margin-bottom: ${({ theme: { space } }) => space[3]}px;
    }
  }
`

const getProjects = async () => {
  const res = await fetch('/projects')
  const data: ProjectType[] = await res.json()
  return data
}

const Index: NextPage = () => {
  const {
    data: projects,
    error: projectsError,
    mutate: mutateProjects,
  } = useSWR('/projects', getProjects)

  const router = useRouter()

  return (
    <main>
      <Header>
        <ArrowLeft onClick={() => router.push('/')} />
        <Plus />
      </Header>
      <Box as='main' overflow='hidden' p={3}>
        <Headline level='three' mb={1}>
          Projects
        </Headline>
        <List pb={3}>
          {projects &&
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => router.push(`/projects/${project.id}`)}
              />
            ))}
        </List>
      </Box>
    </main>
  )
}

export default Index
