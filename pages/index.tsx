import type { GetStaticProps, NextPage } from 'next'
import { x, useColorMode } from '@xstyled/styled-components'
import { FiSearch } from 'react-icons/fi'

import Icon from '../components/Icon'
import Header from '../components/layout/Header'
import Emoji from '../components/Emoji'
import ProjectsCardsList from '../components/project/ProjectsCardsList'
import SwitchButton from '../components/formElements/SwitchButton'

import FloatingButton from '../components/FloatingButton'
import Tasks from '../components/task/Tasks'

type Props = {
  // projects: ProjectType[]
  // initialDate: string
}

const Home: NextPage<Props> = () => {
  const [colorMode, setColorMode] = useColorMode()

  console.log('%cindex rendered', 'color:green')

  return (
    <>
      {/* <Grid /> */}
      <Header>
        <x.span fontFamily='logo' fontSize='xl' color='content-contrast'>
          Za Blanner
        </x.span>

        <x.div display='flex' spaceX={4}>
          <SwitchButton
            height={22}
            checked={colorMode === 'dark'}
            onChange={(e) => {
              setColorMode(colorMode === 'default' ? 'dark' : 'default')
            }}
          />

          <Icon icon={FiSearch} size='1.5rem' />
        </x.div>
      </Header>

      <x.main overflow='hidden'>
        <x.section px={4} mt={4}>
          <div>
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
          </div>
          <div>
            <x.p text='body.large' mt={2}>
              <x.span display='inline' color='content-nonessential'>
                Check this out{' '}
              </x.span>

              <Emoji
                label='backhand index pointing down'
                symbol='👇'
                height={24}
              />
            </x.p>
          </div>
        </x.section>

        <ProjectsCardsList />

        <Tasks />

        <FloatingButton />
      </x.main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  // const res = await fetch('http://localhost:3000/projects')
  // console.log('res', await res.json())
  // const data = await JSON.parse(JSON.stringify(res))
  // const data = res

  // console.log('data', data)

  console.log('static props')

  return {
    props: {},
  }
}

export default Home
