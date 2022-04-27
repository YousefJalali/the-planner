import { useRouter } from 'next/router'
import styled, { x } from '@xstyled/styled-components'
import { FiArrowLeft } from 'react-icons/fi'

import Icon from '../../components/Icon'
import Header from '../../components/layout/Header'
import CircleProgressBar from '../../components/CircleProgressBar'
import { Status, TaskType } from '../../common/types/TaskType'
import useFetchedProjectById from '../../common/data/useFetchedProjectById'

import useToggle from '../../common/hooks/useToggle'
import ScrollableList from '../../components/ScrollableList'
import TasksLists from '../../components/task/TasksLists'
import FloatingButton from '../../components/FloatingButton'
import EditProjectModal from '../../components/modals/EditProjectModal'
import TextEditor from '../../components/formElements/TextEditor'

const Lists = styled(ScrollableList)`
  > div {
    flex: 0 0 calc(100% - 24px);
  }
`

const Item = ({ number, status }: { number: number; status: Status }) => (
  <>
    <x.span alignSelf='center' textTransform='capitalize'>
      • {status}
    </x.span>
    <x.span alignSelf='center' textAlign='center'>
      {number}
    </x.span>
  </>
)

const Project = () => {
  const [editProjectModal, setEditProjectModal] = useToggle(false)

  const router = useRouter()
  const projectId = router.query.projectId as string

  const { project, error, isLoading } = useFetchedProjectById(
    projectId as string
  )

  console.log(error)

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

        {project && (
          <>
            <x.div overflow='hidden' px={4}>
              <x.h1 text='headline.two' lineHeight='tighter' mb={2}>
                {project.title}
              </x.h1>

              {project.description?.length > 0 && (
                <x.div mb={5} maxHeight='128px' overflowY='scroll'>
                  <TextEditor value={project.description} readOnly />
                </x.div>
              )}

              <x.div display='grid' gridTemplateColumns={3} mb={5}>
                <Item number={project.proposed} status={Status.PROPOSED} />

                <x.div gridRow='span 3 / span 3'>
                  <CircleProgressBar
                    color={project.color}
                    percentage={project.progressPercentage}
                  />
                </x.div>

                <Item number={project.inprogress} status={Status.INPROGRESS} />
                <Item number={project.completed} status={Status.COMPLETED} />
              </x.div>
            </x.div>

            <Lists spaceX={3}>
              <TasksLists tasks={project.tasks as TaskType[]} />
            </Lists>

            <EditProjectModal
              isOpen={editProjectModal}
              onRequestClose={setEditProjectModal}
              project={project}
            />
          </>
        )}

        <FloatingButton />
      </x.main>
    </>
  )
}

export default Project
