import { FC } from 'react'
import { useRouter } from 'next/router'
import { x } from '@xstyled/styled-components'

type Props = {
  projects: JSX.Element[] | null
}

const ProjectsList: FC<Props> = ({ projects }) => {
  const router = useRouter()

  return projects && projects.length > 0 ? (
    <x.section mt={6}>
      <x.div
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        px={4}
      >
        <x.h1 text='headline.two' mb={3}>
          Projects
        </x.h1>
        <x.span color='content-subtle' onClick={() => router.push('/projects')}>
          See All
        </x.span>
      </x.div>

      <x.ul px={4} display='flex' overflowX='scroll' spaceX={4}>
        {projects}
      </x.ul>
    </x.section>
  ) : (
    <div>create a project</div>
  )
}

export default ProjectsList
