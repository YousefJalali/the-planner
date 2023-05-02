import { Header } from '@the-planner/ui-web'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import NewProject from './new-project'

export const PageHeader = () => {
  const router = useRouter()

  return (
    <Header pageTitle="Projects" className="py-3">
      <a
        onClick={() => router.push('/')}
        className="btn btn-ghost btn-circle -ml-4"
      >
        <FiArrowLeft size={24} />
      </a>

      <NewProject />
    </Header>
  )
}

export default PageHeader
