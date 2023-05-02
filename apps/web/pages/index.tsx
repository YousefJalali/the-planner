import type { GetStaticProps, NextPage } from 'next'
import { v2 as cloudinary } from 'cloudinary'

import ProjectsCardsList from '../components/project/project-card/project-cards-list'
import { ToggleButton, Logo, Emoji, Header } from '@the-planner/ui-web'

import DateTasks from '../components/task/date-tasks/date-tasks'
import { SearchButton } from '../components/search/'
import CreateTaskButton from '../components/task/create-task-button'

type Props = {
  // projects: Project[]
  // initialDate: string
}

const Home: NextPage<Props> = (props) => {
  // console.log(props)
  // const [colorMode, setColorMode] = useColorMode()

  console.log('%cindex rendered', 'color:green')
  // console.log(props.tasks)

  return (
    <>
      <Header pageTitle="" className="pt-2">
        <div className="h-12">
          <Logo />
        </div>

        <div className="flex items-center space-x-1 -mr-3">
          {/* <ToggleButton
            id="color-mode"
            height={24}
            checked={colorMode === 'dark'}
            onChange={(e) =>
              setColorMode(colorMode === 'light' ? 'dark' : 'light')
            }
            darkMode
          /> */}

          <SearchButton />
        </div>
      </Header>

      <section className="px-6 mt-6">
        <span className="text-2xl">
          <span className="font-light opacity-60">Hello mate, </span>
          <span className="font-semibold">still in doubt?</span>
        </span>

        <span className="block text-xl mt-1">
          <span className="font-light opacity-80">Check this out </span>
          <Emoji label="backhand index pointing down" symbol="👇" height={24} />
        </span>
      </section>

      <ProjectsCardsList />

      <DateTasks />

      <CreateTaskButton />
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
