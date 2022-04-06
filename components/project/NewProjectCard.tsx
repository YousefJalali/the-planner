import { useTheme, x } from '@xstyled/styled-components'
import { FiPlus } from 'react-icons/fi'
import NoTasksSVG from '../../styles/illustrations/NoTasksSVG'
import Button from '../formElements/Button'
import { Card } from './ProjectCard'

const NewProjectCard = () => {
  const theme = useTheme()

  return (
    <x.div>
      <Card color={theme.colors['brand-primary']}>
        <x.div
          display='flex'
          justifyContent='space-between'
          // flexDirection='row-reverse'
        >
          <x.div
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
          >
            <x.div mb={4}>
              <x.span
                color='content-contrast'
                text='body.large'
                display='block'
              >
                No active projects
              </x.span>
              <x.span color='content-subtle' text='body.small'>
                Create your first project now
              </x.span>
            </x.div>

            <Button size='small' leftIcon={FiPlus}>
              New Project
            </Button>
          </x.div>

          <x.div flex='0 0 30%'>
            <NoTasksSVG />
          </x.div>
        </x.div>
      </Card>
    </x.div>
  )
}

export default NewProjectCard
