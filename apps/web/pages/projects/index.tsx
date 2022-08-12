import { NextPage } from 'next'
import { x } from '@xstyled/styled-components'
import {
  PageHeader,
  ProjectCardsList,
} from '../../components/project/projects-page/'

const Index: NextPage = () => {
  return (
    <>
      <PageHeader />

      <x.section overflow="hidden" px={4}>
        <x.h1 text="headline.two">Projects</x.h1>

        <ProjectCardsList />
      </x.section>
    </>
  )
}

export default Index
