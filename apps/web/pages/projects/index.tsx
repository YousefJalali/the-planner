import { NextPage } from 'next'
import { ProjectCardsList } from '../../components/project/projects-page/'
import { Header } from 'apps/web/components/ui'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import CreateProject from 'apps/web/components/project/CreateProject'

const Index: NextPage = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen">
      <Header pageTitle="Projects" className="py-3 lg:py-6">
        <a
          onClick={() => router.push('/')}
          className="btn btn-ghost btn-circle -ml-4 lg:hidden"
        >
          <FiArrowLeft size={24} />
        </a>

        <h1 className="text-4xl font-bold hidden lg:inline-block">Projects</h1>

        <CreateProject className="-mr-4 lg:m-0" />
      </Header>

      <section className="overflow-hidden px-6">
        <h1 className="text-3xl font-bold mb-4 lg:hidden">Projects</h1>

        <ProjectCardsList />
      </section>
    </div>
  )
}

export default Index
