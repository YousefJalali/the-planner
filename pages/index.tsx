import type { NextPage } from 'next'
import useSWR from 'swr'
import { Headline, Text, Box } from '../styles'
import Header from '../components/layout/Header'
import { Search } from 'lucide-react'
import Emoji from '../components/Emoji'
import TaskItem from '../components/task/TaskItem'
import FloatingButton from '../components/FloatingButton'
import TaskType from '../common/types/TaskType'
import ProjectsList from '../components/project/ProjectsList'

const getTasks = async () => {
  const res = await fetch('/tasks')
  const data: TaskType[] = await res.json()
  return data
}

const Home: NextPage = () => {
  const { data: tasks, error: tasksError } = useSWR('/tasks', getTasks)

  return (
    <div>
      <Header>
        <Text
          as='span'
          fontFamily='Carter One'
          fontSize={4}
          color='content.contrast'
        >
          Za Blanner
        </Text>
        <Search />
      </Header>
      <main>
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

        <ProjectsList />

        <Box as='section' mt={4}>
          <Headline level='three' px={3} mb={1}>
            Today’s tasks
          </Headline>
          <Box as='ul' px={3} pb={3}>
            {tasks?.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </Box>
        </Box>

        <FloatingButton />
      </main>
    </div>
  )
}

export default Home
