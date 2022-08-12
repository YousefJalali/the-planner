import { Button, Header } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import NewProject from './new-project'

export const PageHeader = () => {
  const router = useRouter()

  return (
    <Header pageTitle="Projects">
      <Button
        name="back"
        variant="outline"
        onClick={() => router.push('/')}
        ml={4}
        borderColor="layout-level0accent"
        borderRadius="full"
        p={1}
      >
        <x.span fontSize="1.5rem" color="content-contrast">
          <FiArrowLeft />
        </x.span>
      </Button>

      <NewProject />
    </Header>
  )
}

export default PageHeader
