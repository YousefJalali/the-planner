import { useRouter } from 'next/router'
import styled, { x } from '@xstyled/styled-components'
import { FiArrowLeft } from 'react-icons/fi'
import _ from 'lodash'

import Header from '../../components/layout/Header'
import CircleProgressBar from '../../components/CircleProgressBar'
import { Status, TaskWithProjectType } from '../../common/types/TaskType'
import useProject from '../../common/data/useProject'

import ScrollableList from '../../components/ScrollableList'
import TasksLists from '../../components/task/TasksLists'
import FloatingButton from '../../components/FloatingButton'
import TextEditor from '../../components/formElements/TextEditor'
import { useModal } from '../../common/contexts/ModalCtx'
import Button from '../../components/formElements/Button'
import { statusAlias } from '../../common/utils/statusAlias'
import EditProject from '../../components/project/EditProject'
import Spinner from '../../components/Spinner'
import useProjectStats from '../../common/data/useProjectStats'

const Lists = styled(ScrollableList)`
  > div {
    flex: 0 0 calc(100% - 24px);
  }
`

const Item = ({ number, status }: { number: number; status: Status }) => (
  <>
    <x.span alignSelf='center' textTransform='capitalize'>
      {statusAlias(status)}
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

  const { project, error, isLoading } = useProject(projectId)
  const { projectStats } = useProjectStats(projectId)

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

  const progress =
    (project &&
      +(
        (project.tasks.filter((task) => task.status === Status.COMPLETED)
          .length *
          100) /
        project._count.tasks
      ).toFixed(0)) ||
    0

  return (
    <>
      <x.main minHeight='100vh'>
        <Header pageTitle={project ? project.title : ''}>
          <Button
            name='back'
            variant='outline'
            onClick={() => router.back()}
            ml={4}
            borderColor='layout-level0accent'
            borderRadius='full'
            p={1}
          >
            <x.span fontSize='1.5rem' color='content-contrast'>
              <FiArrowLeft />
            </x.span>
          </Button>

          {project ? (
            <Button
              name='edit project'
              variant='textOnly'
              color='information'
              onClick={editProjectHandler}
              mr='calc(24px - 0.5rem)'
            >
              Edit
            </Button>
          ) : (
            <div />
          )}
        </Header>

        {isLoading ? (
          <x.div px={4} display='flex' justifyContent='center'>
            <Spinner pathColor='brand-primary' />
          </x.div>
        ) : error ? (
          <x.div px={4} display='flex' justifyContent='center'>
            {error}
          </x.div>
        ) : (
          project && (
            <>
              <x.section overflow='hidden' px={4}>
                <x.h1 text='headline.two' lineHeight='tighter' mb={2}>
                  {project.title}
                </x.h1>

                {project.description?.length > 0 && (
                  <x.div mb={5} maxHeight='128px' overflowY='scroll'>
                    <TextEditor value={project.description} readOnly />
                  </x.div>
                )}

                {projectStats && (
                  <x.div display='grid' gridTemplateColumns={3} mb={5}>
                    <Item
                      number={projectStats.get(Status.PROPOSED) || 0}
                      status={Status.PROPOSED}
                    />

                    <x.div gridRow='span 3 / span 3'>
                      <CircleProgressBar
                        color={project.color}
                        percentage={progress}
                      />
                    </x.div>

                    <Item
                      number={projectStats.get(Status.INPROGRESS) || 0}
                      status={Status.INPROGRESS}
                    />
                    <Item
                      number={projectStats.get(Status.COMPLETED) || 0}
                      status={Status.COMPLETED}
                    />
                  </x.div>
                )}
              </x.section>

              <Lists as='section' spaceX={3} mb={4}>
                <TasksLists
                  tasks={project.tasks as TaskWithProjectType[]}
                  showEmptyState
                  showDivider
                  projectId={project.id}
                />
              </Lists>
            </>
          )
        )}

        {project && <FloatingButton />}
      </x.main>
    </>
  )
}

export default Project
