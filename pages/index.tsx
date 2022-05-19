import type { GetStaticProps, NextPage } from 'next'
import { x, useColorMode } from '@xstyled/styled-components'
import { FiSearch } from 'react-icons/fi'

import Header from '../components/layout/Header'
import Emoji from '../components/Emoji'
import ProjectsCardsList from '../components/project/ProjectsCardsList'
import SwitchButton from '../components/formElements/SwitchButton'

import FloatingButton from '../components/FloatingButton'
import DateTasks from '../components/task/DateTasks'
import Button from '../components/formElements/Button'
import Logo from '../styles/illustrations/Logo'

type Props = {
  // projects: ProjectType[]
  // initialDate: string
}

const Home: NextPage<Props> = (props) => {
  // console.log(props)
  const [colorMode, setColorMode] = useColorMode()

  console.log('%cindex rendered', 'color:green')

  return (
    <>
      <Header pageTitle=''>
        <x.div ml={4} h={48}>
          <Logo />
        </x.div>

        <x.div
          display='flex'
          alignItems='center'
          spaceX={1}
          mr='calc(24px - 0.5rem)'
        >
          <SwitchButton
            id='color-mode'
            height={24}
            checked={colorMode === 'dark'}
            onChange={(e) =>
              setColorMode(colorMode === 'light' ? 'dark' : 'light')
            }
            darkMode
          />

          <Button name='search' variant='textOnly'>
            <x.span fontSize='1.5rem' color='content-contrast'>
              <FiSearch />
            </x.span>
          </Button>
        </x.div>
      </Header>

      <>
        <x.section px={4} mt={4}>
          <x.p
            text='headline.three'
            color='content-contrast'
            fontWeight='light'
          >
            Hello mate,{' '}
            <x.span text='headline.three' fontWeight='medium'>
              still in doubt?
            </x.span>
          </x.p>

          <x.p text='body.large' mt={2}>
            <x.span display='inline' color='content-subtle'>
              Check this out{' '}
            </x.span>

            <Emoji
              label='backhand index pointing down'
              symbol='👇'
              height={24}
            />
          </x.p>
        </x.section>

        <ProjectsCardsList />

        <DateTasks />

        <FloatingButton />
      </>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  }
}

export default Home
