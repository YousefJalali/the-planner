import { NextPage } from 'next'
import {
  PageHeader,
  ProjectCardsList,
} from '../../components/project/projects-page/'

const Index: NextPage = () => {
  return (
    <>
      <PageHeader />

      <section className="overflow-hidden px-6">
        <h1 className="text-3xl font-bold">Projects</h1>

        <ProjectCardsList />
      </section>
    </>
  )
}

export default Index
