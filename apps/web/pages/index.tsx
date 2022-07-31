import type { GetStaticProps, NextPage } from 'next'
import { x, useColorMode } from '@xstyled/styled-components'
import { v2 as cloudinary } from 'cloudinary'

import ProjectsCardsList from '../components/project/project-card/project-cards-list'
import { ToggleButton, Logo, Emoji, Header } from '@the-planner/ui-web'

import DateTasks from '../components/task/date-tasks'
import { SearchButton } from '../components/search/'

type Props = {
  // projects: ProjectType[]
  // initialDate: string
}

const Home: NextPage<Props> = (props) => {
  // console.log(props)
  const [colorMode, setColorMode] = useColorMode()

  console.log('%cindex rendered', 'color:green')
  // console.log(props.tasks)

  return (
    <>
      <Header pageTitle="">
        <x.div ml={4} h={48}>
          <Logo />
        </x.div>

        <x.div
          display="flex"
          alignItems="center"
          spaceX={1}
          mr="calc(24px - 0.5rem)"
        >
          <ToggleButton
            id="color-mode"
            height={24}
            checked={colorMode === 'dark'}
            onChange={(e) =>
              setColorMode(colorMode === 'light' ? 'dark' : 'light')
            }
            darkMode
          />

          <SearchButton />
        </x.div>
      </Header>

      <x.section px={4} mt={4}>
        <x.p text="headline.three" color="content-contrast" fontWeight="light">
          Hello mate,{' '}
          <x.span
            display="inline-block"
            text="headline.three"
            fontWeight="medium"
          >
            still in doubt?
          </x.span>
        </x.p>

        <x.div text="body.large" mt={2}>
          <x.span display="inline-block" color="content-subtle">
            Check this out{' '}
          </x.span>

          <Emoji label="backhand index pointing down" symbol="👇" height={24} />
        </x.div>
      </x.section>

      <ProjectsCardsList />

      <DateTasks />
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  // const startDate = UTCDate(addCurrentTime(new Date()))

  // const res = await prisma.task.findMany({
  //   where: {
  //     startDate,
  //   },
  //   orderBy: { createdAt: 'desc' },
  //   include: { project: { select: { title: true, color: true } } },
  // })

  // const tasks = JSON.parse(JSON.stringify(res))

  // console.log(tasks)

  const {
    hostname: cloud_name,
    username: api_key,
    password: api_secret,
  } = new URL(process.env.CLOUDINARY_URL as string)

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  })

  return {
    props: {},
  }
}

export default Home
