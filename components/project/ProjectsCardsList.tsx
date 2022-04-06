import { FC, useMemo } from 'react'
import { useRouter } from 'next/router'
import { x } from '@xstyled/styled-components'
import ProjectCard from './ProjectCard'
import useFetchedProjects from '../../common/data/useFetchedProjects'
import NewProjectCard from './NewProjectCard'
import ScrollableList from '../ScrollableList'

type Props = {
  // projects: ProjectType[]
  error: string | null
  isLoading: boolean
}

const ProjectsList: FC = () => {
  const router = useRouter()

  const { projects, setProjects, error, isLoading } =
    useFetchedProjects('ProjectsCardsList')

  // const cards = useMemo(
  //   () =>
  //     projects.slice(0, 5).map((project) => (
  //       <x.li key={project.id} flex='0 0 calc(100% - 1.5rem)'>
  //         <ProjectCard
  //           project={project}
  //           onClick={() => router.push(`/projects/${project.id}`)}
  //         />
  //       </x.li>
  //     )),
  //   [projects]
  // )

  return useMemo(
    () => (
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
          <x.span
            color='content-subtle'
            onClick={() => router.push('/projects')}
          >
            See All
          </x.span>
        </x.div>

        {isLoading ? (
          <x.div px={4} h={150}>
            loading...
          </x.div>
        ) : error ? (
          <x.div px={4}>error</x.div>
        ) : projects && projects.length <= 0 ? (
          <NewProjectCard />
        ) : (
          <ScrollableList spaceX={4}>
            {projects.slice(0, 5).map((project) => (
              <x.li key={project.id} flex='0 0 calc(100% - 1.5rem)'>
                <div />
                <ProjectCard
                  project={project}
                  onClick={() => router.push(`/projects/${project.id}`)}
                />
              </x.li>
            ))}
            {/* {cards} */}
          </ScrollableList>
        )}
      </x.section>
    ),
    [projects]
  )

  // return (
  //   <x.section mt={6}>
  //     <x.div
  //       display='flex'
  //       justifyContent='space-between'
  //       alignItems='center'
  //       px={4}
  //     >
  //       <x.h1 text='headline.two' mb={3}>
  //         Projects
  //       </x.h1>
  //       <x.span color='content-subtle' onClick={() => router.push('/projects')}>
  //         See All
  //       </x.span>
  //     </x.div>

  //     {isLoading ? (
  //       <x.div px={4}>loading...</x.div>
  //     ) : error ? (
  //       <x.div px={4}>error</x.div>
  //     ) : projects && projects.length <= 0 ? (
  //       <NewProjectCard />
  //     ) : (
  //       <ScrollableList spaceX={4}>
  //         {/* {projects.slice(0, 5).map((project) => (
  //           <x.li key={project.id} flex='0 0 calc(100% - 1.5rem)'>
  //             <ProjectCard
  //               project={project}
  //               onClick={() => router.push(`/projects/${project.id}`)}
  //             />
  //           </x.li>
  //         ))} */}
  //         {cards}
  //       </ScrollableList>
  //     )}
  //   </x.section>
  // )
}

export default ProjectsList
