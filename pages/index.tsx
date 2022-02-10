import type { GetStaticProps, NextPage } from 'next'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Headline, Text, Box } from '../styles'
import Header from '../components/layout/Header'
import { Search } from 'lucide-react'
import Emoji from '../components/Emoji'
import TaskItem from '../components/task/TaskItem'
import FloatingButton from '../components/FloatingButton'
import { TaskType, Status } from '../common/types/TaskType'
import ProjectsList from '../components/project/ProjectsList'
import DateSelector from '../components/DateSelector'
import { useState } from 'react'
import TasksList from '../components/task/TasksList'
import NoTasks from '../components/task/NoTasks'
import { ProjectType } from '../common/types/ProjectType'
import ProjectCard from '../components/project/ProjectCard'
import { useColorMode } from '@xstyled/styled-components'
import { x } from '@xstyled/styled-components'

const getProjects = async () => {
  const res = await fetch('/projects')
  const data: ProjectType[] = await res.json()
  return data
}

const getDateTasks = async (date: string) => {
  const res = await fetch(`/tasks/${date}`)
  const data: TaskType[] = await res.json()
  return data
}

type Props = {
  // projects: ProjectType[]
}

const Home: NextPage<Props> = () => {
  const [date, setDate] = useState(new Date().toDateString())

  const router = useRouter()

  const {
    data: dateTasks,
    error: dateTasksError,
    mutate: mutateTasks,
  } = useSWR(date ? `/tasks/${date}` : null, () => getDateTasks(date))

  const {
    data: projects,
    error: projectsError,
    mutate: mutateProjects,
  } = useSWR('/projects', getProjects)

  const onTaskCheckHandler = async (taskId: string) => {
    mutateTasks((data) => {
      return (
        data && [
          ...data.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status:
                    task.status === Status.COMPLETED
                      ? Status.PROPOSED
                      : Status.COMPLETED,
                }
              : task
          ),
        ]
      )
    }, false)

    try {
      const res = await fetch(`/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify(taskId),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const { success, data } = await res.json()

      if (success) {
        console.log('res', data)
        mutateTasks()
      }
    } catch (error) {
      console.log(error)
    }
  }

  let renderProjects = null
  if (projects) {
    renderProjects = projects
      .slice(0, 5)
      .map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => router.push(`/projects/${project.id}`)}
        />
      ))
  }

  let inProgressTasks = null
  let proposedTasks = null
  let completedTasks = null

  if (dateTasks) {
    inProgressTasks = dateTasks
      .filter((task) => task.status === Status.INPROGRESS)
      .map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onCheck={() => onTaskCheckHandler(task.id)}
        />
      ))

    proposedTasks = dateTasks
      .filter((task) => task.status === Status.PROPOSED)
      .map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onCheck={() => onTaskCheckHandler(task.id)}
        />
      ))

    completedTasks = dateTasks
      .filter((task) => task.status === Status.COMPLETED)
      .map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onCheck={() => onTaskCheckHandler(task.id)}
        />
      ))
  }

  const [colorMode, setColorMode] = useColorMode()

  return (
    <x.div container mx='auto' backgroundColor='layout.level0'>
      <Header>
        <Text
          as='span'
          fontFamily='Carter One'
          fontSize={4}
          color='content.contrast'
        >
          Za Blanner
        </Text>
        <button
          onClick={(e) => {
            setColorMode(colorMode === 'default' ? 'dark' : 'default')
          }}
        >
          {colorMode === 'default' ? 'Dark' : 'Light'}
        </button>
        <Search />
      </Header>
      <Box as='main' overflow='hidden'>
        <Box as='section' px={3} mt={4}>
          <div>
            <Text fontSize={4} fontWeight='light' color='content.contrast'>
              Hello mate,{' '}
              <Text as='span' fontWeight='bold'>
                still in doubt?
              </Text>
            </Text>
          </div>
          <div>
            <Text fontSize={3} color='content.subtle' mt={1}>
              Check this out{' '}
              <Emoji label='backhand index pointing down' symbol='👇' />
            </Text>
          </div>
        </Box>

        {renderProjects && renderProjects.length > 0 && (
          <ProjectsList projects={renderProjects} />
        )}

        <Box as='section' mt={4} mb={5}>
          <Headline level='three' px={3} mb={1}>
            Tasks
          </Headline>

          <DateSelector date={date} setDate={setDate} />

          {inProgressTasks && inProgressTasks.length > 0 && (
            <TasksList
              title='In Progress'
              tasks={inProgressTasks}
              titleColor='tag.inprogress.color'
            />
          )}

          {proposedTasks && proposedTasks.length > 0 ? (
            <TasksList
              title='Proposed tasks'
              tasks={proposedTasks}
              titleColor='tag.proposed.color'
            />
          ) : (
            <Box px={3}>
              <NoTasks />
            </Box>
          )}

          {completedTasks && completedTasks.length > 0 && (
            <TasksList
              title='Completed tasks'
              tasks={completedTasks}
              titleColor='tag.completed.color'
            />
          )}
        </Box>

        <FloatingButton />
      </Box>
    </x.div>
  )
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const res = await fetch('http://localhost:3000/projects')
//   const data: ProjectType[] = await res.json()

//   console.log('data', data)

//   return {
//     props: {
//       projects: data,
//     },
//   }
// }

export default Home
