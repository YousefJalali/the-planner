import { useState } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { x, useColorMode } from '@xstyled/styled-components'
import { FiPlus, FiSearch } from 'react-icons/fi'

import Icon from '../components/Icon'
import Header from '../components/layout/Header'
import Emoji from '../components/Emoji'
import TaskItem from '../components/task/TaskItem'
import ProjectsList from '../components/project/ProjectsList'
import DateSelector from '../components/DateSelector'
import TasksList from '../components/task/TasksList'
import NoTasks from '../components/task/NoTasks'
import ProjectCard from '../components/project/ProjectCard'
import SwitchButton from '../components/formElements/SwitchButton'
import Modal from '../components/layout/Modal'
import FormWithHeader from '../components/FormWithHeader'
import TaskForm from '../components/task/TaskForm'

import { Status, TaskType } from '../common/types/TaskType'
import useFetchedProjects from '../common/data/useFetchedProjects'
import useFetchedDateTasks from '../common/data/useFetchedDateTasks'
import {
  changeTaskStatus,
  createTask,
  deleteTask,
  editTask,
} from '../common/actions/taskActions'
import useToggle from '../common/hooks/useToggle'
import Grid from '../styles/Grid'

type Props = {
  // projects: ProjectType[]
}

const Home: NextPage<Props> = () => {
  const [createTaskModal, setCreateTaskModal] = useToggle()

  const [colorMode, setColorMode] = useColorMode()

  const [date, setDate] = useState(new Date().toDateString())

  const router = useRouter()

  const {
    projects,
    setProjects,
    error: projectsError,
    isLoading: isProjectsLoading,
  } = useFetchedProjects()

  const {
    dateTasks,
    setDateTasks,
    error: dateTasksError,
    isLoading: isDateTasksLoading,
  } = useFetchedDateTasks(date)

  const createTaskHandler = async (formData: TaskType) => {
    //mutate without revalidation
    setDateTasks((data) => data && [...data, { ...formData }], false)

    createTask(formData, () => {
      setCreateTaskModal(false)
      setDateTasks()
    })
  }

  const deleteTaskHandler = (taskId: string) => {
    setDateTasks((data) => {
      return data && [...data.filter((task) => task.id !== taskId)]
    }, false)

    deleteTask(taskId, () => {
      setDateTasks()
    })
  }

  const editTaskHandler = (updatedTask: TaskType) => {
    // setDateTasks((data) => {
    //   const project = projects.find((p) => p.id === updatedTask.project)
    //   if (project) {
    //     return (
    //       data && [
    //         ...data.map((task) =>
    //           task.id === updatedTask.id
    //             ? {
    //                 ...updatedTask,
    //                 project: {
    //                   id: project.id,
    //                   title: project.title,
    //                   color: project.color,
    //                 },
    //               }
    //             : task
    //         ),
    //       ]
    //     )
    //   }
    // }, false)

    editTask(updatedTask, () => {
      setDateTasks()
      setProjects()
    })
  }

  const changeTaskStatusHandler = (taskId: string, status: Status) => {
    //   setDateTasks((data) => {
    //     return (
    //       data && [
    //         ...data.map((task) =>
    //           task.id === taskId
    //             ? {
    //                 ...task,
    //                 status:
    //                   task.status === Status.COMPLETED
    //                     ? Status.PROPOSED
    //                     : Status.COMPLETED,
    //               }
    //             : task
    //         ),
    //       ]
    //     )
    //   }, false)
    changeTaskStatus(taskId, status, () => {
      setDateTasks()
    })
  }

  // render projects
  let renderProjects = null
  if (projects) {
    renderProjects = projects.slice(0, 5).map((project) => (
      <x.li key={project.id} flex='0 0 calc(100% - 1.5rem)'>
        <ProjectCard
          project={project}
          onClick={() => router.push(`/projects/${project.id}`)}
        />
      </x.li>
    ))
  }

  // render date tasks
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
          onDelete={() => deleteTaskHandler(task.id)}
          onEdit={editTaskHandler}
          onChangeStatus={changeTaskStatusHandler}
        />
      ))

    proposedTasks = dateTasks
      .filter((task) => task.status === Status.PROPOSED)
      .map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={() => deleteTaskHandler(task.id)}
          onEdit={editTaskHandler}
          onChangeStatus={changeTaskStatusHandler}
        />
      ))

    completedTasks = dateTasks
      .filter((task) => task.status === Status.COMPLETED)
      .map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={() => deleteTaskHandler(task.id)}
          onEdit={editTaskHandler}
          onChangeStatus={changeTaskStatusHandler}
        />
      ))
  }

  return (
    <x.div
      container
      mx='auto'
      backgroundColor='layout-level0'
      minHeight='100vh'
    >
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

          <Icon icon={FiSearch} size='xl' />
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
              <x.span color='content-nonessential'>Check this out </x.span>
              <Emoji label='backhand index pointing down' symbol='👇' />
            </x.p>
          </div>
        </x.section>

        {/* {renderProjects && renderProjects.length > 0 && (
          <ProjectsList projects={renderProjects} />
        )} */}

        <ProjectsList projects={renderProjects} />

        <x.section my={4} mt={6}>
          <x.h1 text='headline.two' px={4} mb={3}>
            Tasks
          </x.h1>

          <DateSelector date={date} setDate={setDate} />

          {inProgressTasks && inProgressTasks.length > 0 && (
            <TasksList
              title='In Progress'
              tasks={inProgressTasks}
              titleColor='tag-inprogress-color'
            />
          )}

          {proposedTasks && proposedTasks.length > 0 ? (
            <TasksList
              title='Proposed tasks'
              tasks={proposedTasks}
              titleColor='tag-proposed-color'
            />
          ) : (
            <x.div px={4}>
              <NoTasks />
            </x.div>
          )}

          {completedTasks && completedTasks.length > 0 && (
            <TasksList
              title='Completed tasks'
              tasks={completedTasks}
              titleColor='tag-completed-color'
            />
          )}
        </x.section>

        {/* Floating Button */}
        <x.button
          position='fixed'
          bottom='24px'
          right='24px'
          h={48}
          w={48}
          borderRadius='full'
          backgroundColor='brand-primary'
          boxShadow='0px 4px 19px rgba(0, 0, 0, 0.25)'
          zIndex={800}
          display='flex'
          justifyContent='center'
          alignItems='center'
          onClick={setCreateTaskModal}
        >
          <Icon icon={FiPlus} size='2rem' color='layout-level0' />
        </x.button>

        <Modal isOpen={createTaskModal} onRequestClose={setCreateTaskModal}>
          <FormWithHeader
            title='Create task'
            onClose={setCreateTaskModal}
            id='create-task-form'
          >
            <TaskForm id='create-task-form' onSubmit={createTaskHandler} />
          </FormWithHeader>
        </Modal>
      </x.main>
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
