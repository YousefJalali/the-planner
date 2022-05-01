import { useRouter } from 'next/router'
import styled, { x } from '@xstyled/styled-components'
import { FiArrowLeft } from 'react-icons/fi'

import Header from '../../components/layout/Header'
import CircleProgressBar from '../../components/CircleProgressBar'
import { Status, TaskWithProjectType } from '../../common/types/TaskType'
import useFetchedProjectById from '../../common/data/useFetchedProjectById'

import ScrollableList from '../../components/ScrollableList'
import TasksLists from '../../components/task/TasksLists'
import FloatingButton from '../../components/FloatingButton'
import TextEditor from '../../components/formElements/TextEditor'
import { useModal } from '../../common/contexts/ModalCtx'
import Button from '../../components/formElements/Button'
import { statusAlias } from '../../common/utils/statusAlias'
import EditProject from '../../components/project/EditProject'

const Lists = styled(ScrollableList)`
  > div {
    flex: 0 0 calc(100% - 24px);
  }
`

const Item = ({ number, status }: { number: number; status: Status }) => (
  <>
    <x.span alignSelf='center' textTransform='capitalize'>
      • {statusAlias(status)}
    </x.span>
    <x.span alignSelf='center' textAlign='center'>
      {number}
    </x.span>
  </>
)

const Project = () => {
  const { setModal, clearModal } = useModal()

  const router = useRouter()
  const projectId = router.query.projectId as string

  const { project, error, isLoading } = useFetchedProjectById(
    projectId as string
  )

  const editProjectHandler = () => {
    if (project) {
      setModal({
        id: 'project-edit',
        content: (
          <EditProject
            project={project}
            onRequestCloseAfterEdit={() => clearModal('project-edit')}
            onRequestCloseAfterDelete={() => {
              clearModal('project-edit')
              router.back()
            }}
          />
        ),
      })
    }
  }

  return (
    <>
      <x.main minHeight='100vh'>
        <Header pageTitle={project ? project.title : ''}>
          <Button variant='textOnly' onClick={() => router.back()}>
            <x.span fontSize='1.5rem' color='content-contrast'>
              <FiArrowLeft />
            </x.span>
          </Button>

          <Button
            variant='textOnly'
            color='information'
            onClick={editProjectHandler}
          >
            Edit
          </Button>
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
              <TasksLists tasks={project.tasks as TaskWithProjectType[]} />
            </Lists>
          </>
        )}

        <FloatingButton />
      </x.main>
    </>
  )
}

export default Project
