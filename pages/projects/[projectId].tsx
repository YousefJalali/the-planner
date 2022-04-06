import { useRouter } from 'next/router'
import { x } from '@xstyled/styled-components'
import { FiArrowLeft, FiPlus } from 'react-icons/fi'

import Icon from '../../components/Icon'
import Header from '../../components/layout/Header'
import CircleProgressBar from '../../components/CircleProgressBar'
import Tag from '../../components/task/Tag'
import { Status, TaskType } from '../../common/types/TaskType'
import useFetchedProjectById from '../../common/data/useFetchedProjectById'

import useToggle from '../../common/hooks/useToggle'
import Emoji from '../../components/Emoji'
import CreateTask from '../../components/task/CreateTask'
import Modal from '../../components/layout/Modal'
import TasksList from '../../components/task/TasksList'
import ScrollableList from '../../components/ScrollableList'

const Project = () => {
  const [createTaskModal, setCreateTaskModal] = useToggle()
  const [editProjectModal, setEditProjectModal] = useToggle()

  const router = useRouter()
  const projectId = router.query.projectId as string

  const { project, setProject, error, isLoading } = useFetchedProjectById(
    projectId as string
  )

  let inProgressTasks = null
  let proposedTasks = null
  let completedTasks = null

  if (project) {
    inProgressTasks = (project.tasks as TaskType[]).filter(
      (task) => task.status === Status.INPROGRESS
    )

    proposedTasks = (project.tasks as TaskType[]).filter(
      (task) => task.status === Status.PROPOSED
    )

    completedTasks = (project.tasks as TaskType[]).filter(
      (task) => task.status === Status.COMPLETED
    )
  }

  return (
    <>
      <x.main minHeight='100vh'>
        <Header>
          <x.a onClick={() => router.back()}>
            <Icon icon={FiArrowLeft} size='1.5rem' />
          </x.a>

          <x.a textDecoration='underline' onClick={setEditProjectModal}>
            Edit
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
                  • {Status.PROPOSED}
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
                  • {Status.INPROGRESS}
                </x.div>
                <x.div
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                >
                  {project.inprogress}
                </x.div>

                <x.div display='flex' alignItems='center'>
                  • {Status.COMPLETED}
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

            <ScrollableList spaceX={3}>
              {/* Proposed tasks */}
              <x.div
                flex='0 0 calc(100% - 24px)'
                borderLeft='2px solid'
                borderLeftColor='tag-proposed-color'
                pl={2}
                spaceY={3}
              >
                <Tag variant={Status.PROPOSED} />

                {proposedTasks && proposedTasks.length > 0 ? (
                  <TasksList
                    id={`${Status.PROPOSED}-project-tasks`}
                    tasks={proposedTasks}
                    project={projectId}
                  />
                ) : (
                  <x.div>
                    <x.span
                      color='content-nonessential'
                      mr={1}
                      display='inline-block'
                    >
                      All done{' '}
                    </x.span>
                    <Emoji label='congratulations' symbol='🥳' />
                  </x.div>
                )}
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
              </x.div>

              {/* in progress tasks */}
              <x.div
                flex='0 0 calc(100% - 24px)'
                borderLeft='2px solid'
                borderLeftColor='tag-inprogress-color'
                pl={2}
                spaceY={3}
              >
                <Tag variant={Status.INPROGRESS} />

                {inProgressTasks && inProgressTasks.length > 0 ? (
                  <TasksList
                    id={`${Status.INPROGRESS}-project-tasks`}
                    tasks={inProgressTasks}
                    project={projectId}
                  />
                ) : (
                  <x.div>
                    <x.span
                      color='content-nonessential'
                      mt={2}
                      mr={1}
                      display='inline-block'
                    >
                      No tasks in progress{' '}
                    </x.span>
                    <Emoji label='face looking up' symbol='🙄' />
                  </x.div>
                )}
              </x.div>

              {/* completed tasks */}
              <x.div
                flex='0 0 calc(100% - 24px)'
                borderLeft='2px solid'
                borderLeftColor='tag-completed-color'
                pl={2}
                spaceY={3}
              >
                <Tag variant={Status.COMPLETED} />

                {completedTasks && completedTasks.length > 0 ? (
                  <TasksList
                    id={`${Status.COMPLETED}-project-tasks`}
                    tasks={completedTasks}
                    project={projectId}
                  />
                ) : (
                  <x.div>
                    <x.span
                      color='content-nonessential'
                      mt={2}
                      mr={1}
                      display='inline-block'
                    >
                      No completed tasks{' '}
                    </x.span>
                    <Emoji label='poker face' symbol='😐' />
                  </x.div>
                )}
              </x.div>
            </ScrollableList>
          </>
        ) : (
          <div>loading...</div>
        )}
      </x.main>

      <Modal isOpen={createTaskModal} onRequestClose={setCreateTaskModal}>
        <CreateTask onRequestClose={setCreateTaskModal} projectId={projectId} />
      </Modal>
    </>
  )
}

export default Project
