import { useRouter } from 'next/router'
import styled, { x } from '@xstyled/styled-components'
import { FiArrowLeft } from 'react-icons/fi'

import Icon from '../../components/Icon'
import Header from '../../components/layout/Header'
import CircleProgressBar from '../../components/CircleProgressBar'
import { Status, TaskWithProjectType } from '../../common/types/TaskType'
import useFetchedProjectById from '../../common/data/useFetchedProjectById'

import ScrollableList from '../../components/ScrollableList'
import TasksLists from '../../components/task/TasksLists'
import FloatingButton from '../../components/FloatingButton'
import TextEditor from '../../components/formElements/TextEditor'
import { useModal } from '../../common/contexts/ModalCtx'
import ProjectForm from '../../components/project/ProjectForm'
import useCreateProject from '../../common/hooks/project/useCreateProject'
import Button from '../../components/formElements/Button'
import { statusAlias } from '../../common/utils/statusAlias'

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

  const { onSubmit, isSubmitting } = useCreateProject(() =>
    clearModal('project-create')
  )

  const editProjectHandler = () => {
    if (project) {
      setModal({
        id: 'project-edit',
        content: (
          <ProjectForm
            id='edit'
            title='Edit Project'
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            defaultValues={project}
            onRequestClose={() => clearModal('project-create')}
          />
        ),
      })
    }
  }

  return (
    <>
      <x.main minHeight='100vh'>
        <Header>
          <x.a onClick={() => router.back()} fontSize='1.5rem'>
            {/* <Icon icon={FiArrowLeft} size='1.5rem' /> */}
            <FiArrowLeft />
          </x.a>

          <Button
            variant='link'
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
