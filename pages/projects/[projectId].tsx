import { useRouter } from 'next/router'
import { x } from '@xstyled/styled-components'
import { FiArrowLeft, FiPlus } from 'react-icons/fi'

import Icon from '../../components/Icon'
import Header from '../../components/layout/Header'
import CircleProgressBar from '../../components/CircleProgressBar'
import TaskItem from '../../components/task/TaskItem'
import Tag from '../../components/task/Tag'
import { Status, TaskType } from '../../common/types/TaskType'
import useFetchedProjectById from '../../common/data/useFetchedProjectById'
import useFetchedProjects from '../../common/data/useFetchedProjects'
import useFetchedDateTasks from '../../common/data/useFetchedDateTasks'
import {
  changeTaskStatus,
  createTask,
  deleteTask,
  editTask,
} from '../../common/actions/taskActions'
import Modal from '../../components/layout/Modal'
import TaskForm from '../../components/task/TaskForm'
import FormWithHeader from '../../components/FormWithHeader'
import useToggle from '../../common/hooks/useToggle'

const Project = () => {
  const [createTaskModal, setCreateTaskModal] = useToggle()

  const router = useRouter()
  const { projectId } = router.query

  const { project, setProject, error, isLoading } = useFetchedProjectById(
    projectId as string
  )

  // const {
  //   projects,
  //   setProjects,
  //   error: projectsError,
  //   isLoading: isProjectsLoading,
  // } = useFetchedProjects()

  // const {
  //   dateTasks,
  //   setDateTasks,
  //   error: dateTasksError,
  //   isLoading: isDateTasksLoading,
  // } = useFetchedDateTasks(date)

  const createTaskHandler = async (formData: TaskType) => {
    //mutate without revalidation
    // setProject((data) => {
    //   console.log(data)
    // }, false)

    createTask(formData, () => {
      setCreateTaskModal(false)
      setProject()
    })
  }

  const deleteTaskHandler = (taskId: string) => {
    // setDateTasks((data) => {
    //   return data && [...data.filter((task) => task.id !== taskId)]
    // }, false)

    deleteTask(taskId, () => {
      setProject()
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
      setProject()
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
      setProject()
    })
  }

  let inProgressTasks = null
  let proposedTasks = null
  let completedTasks = null

  if (project) {
    inProgressTasks = (project.tasks as TaskType[])
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

    proposedTasks = (project.tasks as TaskType[])
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

    completedTasks = (project.tasks as TaskType[])
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
    <>
      <x.main minHeight='100vh'>
        <Header>
          <x.a onClick={() => router.back()}>
            <Icon icon={FiArrowLeft} size='1.5rem' />
          </x.a>
        </Header>
        {project ? (
          <>
            <x.div overflow='hidden' px={4}>
              <x.h1 text='headline.two' lineHeight='tighter' mb={4}>
                {project.title}
              </x.h1>

              <x.div display='grid' gridTemplateColumns={3} mb={5}>
                <x.div display='flex' alignItems='center'>
                  • Proposed
                </x.div>
                <x.div
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                >
                  {project.proposed}
                </x.div>

                <x.div gridRow='span 3 / span 3'>
                  <CircleProgressBar
                    strokeColor={project.color}
                    percentage={project.progressPercentage}
                  />
                </x.div>

                <x.div display='flex' alignItems='center'>
                  • In Progress
                </x.div>
                <x.div
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                >
                  {project.inprogress}
                </x.div>

                <x.div display='flex' alignItems='center'>
                  • Completed
                </x.div>
                <x.div
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                >
                  {project.completed}
                </x.div>
              </x.div>
            </x.div>

            <x.div px={4} display='flex' overflowX='scroll' spaceX={3}>
              <x.div flex='0 0 calc(100% - 24px)'>
                <Tag variant='proposed' />
                <x.ul mt={2} spaceY={3}>
                  {proposedTasks}
                  <x.li
                    border={1}
                    borderStyle='dashed'
                    borderColor='layout-divider'
                    borderRadius={2}
                    px={2}
                    py={3}
                    display='flex'
                    alignItems='center'
                    onClick={setCreateTaskModal}
                  >
                    <Icon icon={FiPlus} size='1.125rem' color='brand-primary' />
                    <x.span text='body' ml={1} color='brand-primary'>
                      Create new task
                    </x.span>
                  </x.li>
                </x.ul>
              </x.div>

              <x.div flex='0 0 calc(100% - 24px)'>
                <Tag variant='in progress' />
                <x.ul mt={2} spaceY={3}>
                  {inProgressTasks}
                </x.ul>
              </x.div>

              <x.div flex='0 0 calc(100% - 24px)'>
                <Tag variant='completed' />
                <x.ul mt={2} spaceY={3}>
                  {completedTasks}
                </x.ul>
              </x.div>
            </x.div>
          </>
        ) : (
          <div>loading...</div>
        )}
      </x.main>
      <Modal isOpen={createTaskModal} onRequestClose={setCreateTaskModal}>
        <FormWithHeader
          title='Create task'
          onClose={setCreateTaskModal}
          id='create-task-form'
        >
          <TaskForm id='create-task-form' onSubmit={createTaskHandler} />
        </FormWithHeader>
      </Modal>
    </>
  )
}

export default Project
