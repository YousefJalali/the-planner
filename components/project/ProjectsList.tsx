import { FC } from 'react'
import { ProjectType } from '../../common/types/ProjectType'
import { Box, Headline, Text } from '../../styles'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const List = styled(Box)`
  > li {
    flex: ${({ theme: { space } }) => `0 0 calc(100% - ${space[3]}px)`};

    &:not(:last-child) {
      margin-right: ${({ theme: { space } }) => space[3]}px;
    }
  }
`

type Props = {
  projects: JSX.Element[]
}

const ProjectsList: FC<Props> = ({ projects }) => {
  const router = useRouter()

  return (
    <Box as='section' mt={4}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        px={3}
      >
        <Headline level='three' mb={1}>
          Projects
        </Headline>
        <Text onClick={() => router.push('/projects')}>See all</Text>
      </Box>

      <List as='ul' px={3} pb={3} display='flex' overflowX='scroll'>
        {projects}
      </List>
    </Box>
  )
}

export default ProjectsList
