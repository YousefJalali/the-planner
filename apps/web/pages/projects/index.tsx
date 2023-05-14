import { GetServerSideProps, NextPage } from 'next'
import { FiArrowLeft } from 'react-icons/fi'
import CreateProject from 'apps/web/components/project/create-project'
import ProjectCardsList from 'apps/web/components/project/project-cards-list'
import Head from 'next/head'
import Link from 'next/link'
import { baseUrl } from '@the-planner/data'
import { customFetch } from '@the-planner/utils'
import { SWRConfig, unstable_serialize } from 'swr'
import { ProjectWithTasks } from '@the-planner/types'

const Index: NextPage = ({
  fallback,
}: {
  [key: string]: ProjectWithTasks[]
}) => {
  return (
    <>
      <Head>
        <title>The Planner | Projects</title>
        <meta charSet="utf-8" />
      </Head>
      <header className="flex justify-between items-center px-6 py-3 lg:py-6">
        <Link href="/" className="btn btn-ghost btn-circle -ml-4 lg:hidden">
          <FiArrowLeft size={24} />
        </Link>

        <h1 className="text-4xl font-bold hidden lg:inline-block">Projects</h1>

        <CreateProject className="-mr-4 lg:m-0" />
      </header>

      <section className="overflow-hidden px-6">
        <h1 className="text-3xl font-bold mb-4 lg:hidden">Projects</h1>

        <SWRConfig value={{ fallback }}>
          <ProjectCardsList />
        </SWRConfig>
      </section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { auth_token } = cookie.parse(context.req.headers.cookie || "")

  const { data: notebooks } = await customFetch(
    `${baseUrl}/api/projects`,
    { method: 'GET', bodyData: null }
    // { method: "GET", bodyData: null, token: auth_token }
  )

  return {
    props: {
      fallback: {
        [unstable_serialize(['/api/projects'])]: JSON.parse(
          JSON.stringify(notebooks)
        ),
      },
    },
  }
}

export default Index
