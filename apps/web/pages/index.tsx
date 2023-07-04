import type { GetStaticProps, NextPage } from 'next'
import { v2 as cloudinary } from 'cloudinary'

import ProjectsCardsList from '../components/project/project-cards-featured'
import { Logo, Emoji } from '../components/ui'

import DateTasks from '../components/task/date-tasks'
import { SearchButton } from '../components/search/'
import CreateTaskButton from '../components/task/create-task'
import CreateProject from '../components/project/create-project'
import { FiPlus } from 'react-icons/fi'

type Props = {
  // projects: Project[]
  // initialDate: string
}

const Home: NextPage<Props> = (props) => {
  // console.log(props)
  // const [colorMode, setColorMode] = useColorMode()

  // console.log('%cindex rendered', 'color:green')
  // console.log(props.tasks)

  return (
    <>
      <div className="drawer drawer-mobile drawer-end">
        <input id="projects-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center relative lg:items-start mb-4">
          <header className="flex justify-between items-center p-6 w-full lg:p-4 xl:px-0">
            <div className="w-8 lg:invisible">
              <Logo logoOnly />
            </div>

            <div className="flex items-center -mr-3 lg:m-0 gap-2">
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

              <label
                htmlFor="side-drawer"
                className="btn-ghost btn-sm drawer-button btn-circle btn -mr-1 p-0 lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>

              {/* <div className="lg:hidden">
                <ProfileButton />
              </div> */}

              <CreateProject>
                {(showModal) => (
                  <button
                    onClick={showModal}
                    className="btn btn-secondary gap-2 hidden lg:flex"
                  >
                    <FiPlus className="h-6 w-6" />
                    new Project
                  </button>
                )}
              </CreateProject>

              <CreateTaskButton />
            </div>
          </header>

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

          <section className="my-12 w-full bg-base-100 lg:rounded-2xl lg:w-[calc(100%-2rem)] lg:m-4 xl:mr-0 xl:w-[calc(100%-1rem)]">
            <DateTasks />
          </section>
        </div>
        <div className="drawer-side m-4 pl-0 !hidden xl:!grid">
          <label htmlFor="projects-drawer" className="drawer-overlay"></label>
          <div className="relative mb-12 w-fit max-w-[348px] rounded-2xl overflow-y-scroll pb-6 h-[calc(100%-1rem)] bg-base-100">
            <ProjectsCardsList />
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
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
