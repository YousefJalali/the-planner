import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import CreateProject from 'apps/web/components/project/create-project'
import ProjectCardsList from 'apps/web/components/project/project-cards-list'
import Head from 'next/head'

const Index: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>The Planner | Projects</title>
        <meta charSet="utf-8" />
      </Head>
      <header className="flex justify-between items-center px-6 py-3 lg:py-6">
        <a
          onClick={() => router.push('/')}
          className="btn btn-ghost btn-circle -ml-4 lg:hidden"
        >
          <FiArrowLeft size={24} />
        </a>

        <h1 className="text-4xl font-bold hidden lg:inline-block">Projects</h1>

        <CreateProject className="-mr-4 lg:m-0" />
      </header>

      <section className="overflow-hidden px-6">
        <h1 className="text-3xl font-bold mb-4 lg:hidden">Projects</h1>

        <ProjectCardsList />
      </section>
    </>
  )
}

export default Index
