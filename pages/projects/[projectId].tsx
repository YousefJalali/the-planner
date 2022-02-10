import useSWR from 'swr'
import { useRouter } from 'next/router'
import { ProjectType } from '../../common/types/ProjectType'
import Header from '../../components/layout/Header'
import { ArrowLeft } from 'lucide-react'
import { Box, Headline, Text } from '../../styles'
import CircleProgressBar from '../../components/CircleProgressBar'
import TaskItem from '../../components/task/TaskItem'
import { Status, TaskType } from '../../common/types/TaskType'
import Tag from '../../components/task/Tag'

const getProject = async (id: string) => {
  const res = await fetch(`/projects/${id}`)
  const data: ProjectType = await res.json()
  return data
}

const Project = () => {
  const router = useRouter()
  const { projectId } = router.query

  const {
    data: project,
    error: projectError,
    mutate: mutateProject,
  } = useSWR(`/project/${projectId}`, () => getProject(projectId as string))

  const onTaskCheckHandler = (id: string) => console.log('checked')

  let inProgressTasks = null
  let pendingTasks = null
  let completedTasks = null

  if (project) {
    inProgressTasks = (project.tasks as TaskType[])
      .filter((task) => task.status === Status.INPROGRESS)
      .map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onCheck={() => onTaskCheckHandler(task.id)}
        />
      ))

    pendingTasks = (project.tasks as TaskType[])
      .filter((task) => task.status === Status.PROPOSED)
      .map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onCheck={() => onTaskCheckHandler(task.id)}
        />
      ))

    completedTasks = (project.tasks as TaskType[])
      .filter((task) => task.status === Status.COMPLETED)
      .map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onCheck={() => onTaskCheckHandler(task.id)}
        />
      ))
  }

  return (
    <main>
      <Header>
        <ArrowLeft onClick={() => router.back()} />
        {/* <ArrowLeft onClick={() => router.push('/projects')} /> */}
      </Header>
      {project ? (
        <>
          <Box overflow='hidden' p={3}>
            <Headline level='one' color='content.contrast' mb={4}>
              {project.title}
            </Headline>

            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              mb={4}
            >
              <Box display='flex'>
                <Box as='ul'>
                  <Text as='li' mb={1}>
                    • Proposed
                  </Text>
                  <Text as='li' mb={1}>
                    • In Progress
                  </Text>
                  <Text as='li'>• Completed</Text>
                </Box>

                <Box as='ul' ml={4}>
                  <Text as='li' mb={1} textAlign='center'>
                    {project.proposed}
                  </Text>
                  <Text as='li' mb={1} textAlign='center'>
                    {project.inprogress}
                  </Text>
                  <Text as='li' textAlign='center'>
                    {project.completed}
                  </Text>
                </Box>
              </Box>

              {/* calc(fontSize of li * lineHeight * number of li + marginBottom) */}
              <Box
                height='calc(1rem * 1.3125 * 3 + 16px)'
                width='calc(1rem * 1.3125 * 3 + 16px)'
              >
                <CircleProgressBar
                  strokeColor={project.color}
                  percentage={project.progressPercentage}
                />
              </Box>
            </Box>
          </Box>

          <Box px={3} display='flex' overflowX='scroll'>
            <Box flex='0 0 calc(100% - 24px)'>
              <Tag variant='proposed' />
              <Box as='ul' mt={1}>
                {pendingTasks}
              </Box>
            </Box>

            <Box ml={3} flex='0 0 calc(100% - 24px)'>
              <Tag variant='in progress' />
              <Box as='ul' mt={1}>
                {inProgressTasks}
              </Box>
            </Box>

            <Box ml={3} flex='0 0 calc(100% - 24px)'>
              <Tag variant='completed' />
              <Box as='ul' mt={1}>
                {completedTasks}
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <div>loading...</div>
      )}
    </main>
  )
}

export default Project
