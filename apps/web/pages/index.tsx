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
      <div className="drawer drawer-mobile drawer-end h-full md:h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center relative lg:items-start mb-4">
          <Header pageTitle="" className="pt-2 w-full lg:p-4 xl:px-0">
            <div className="h-12 lg:invisible">
              <Logo />
            </div>

            <div className="flex items-center space-x-1 -mr-3 lg:m-0">
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

              <CreateTaskButton />
            </div>
          </Header>
          <section className="px-6 mt-6 w-full">
            <span className="text-2xl">
              <span className="font-light opacity-60">Hello mate, </span>
              <span className="font-semibold">still in doubt?</span>
            </span>

            <span className="block text-xl mt-1">
              <span className="font-light opacity-80">Check this out </span>
              <Emoji
                label="backhand index pointing down"
                symbol="👇"
                height={24}
              />
            </span>
          </section>

          <section className="w-full xl:hidden mt-12 lg:m-4 lg:rounded-2xl lg:w-[calc(100%-2rem)] lg:py-6 lg:bg-base-100">
            <ProjectsCardsList />
          </section>

          <DateTasks />
        </div>
        <div className="drawer-side m-4 pl-0 !hidden xl:!grid">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="relative mb-12 w-80 rounded-2xl overflow-y-scroll pb-6 h-[calc(100%-1rem)] bg-base-100">
            <ProjectsCardsList />
          </div>
        </div>
      </div>
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
