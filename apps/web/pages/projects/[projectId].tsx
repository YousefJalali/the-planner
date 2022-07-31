import { useRouter } from 'next/router'
import styled, { x } from '@xstyled/styled-components'
import { FiArrowLeft } from 'react-icons/fi'

import { Status, TaskWithProjectType } from '@the-planner/types'
import { useProject } from '@the-planner/data'

import TasksLists from '../../components/task/tasks-list'
import CreateTaskButton from '../../components/task/create-task-button'
import { useModal } from '@the-planner/hooks'
import {
  Spinner,
  Button,
  ScrollableList,
  TextEditor,
  LinearProgress,
  ErrorMessage,
  Header,
} from '@the-planner/ui-web'
import { useEditProject, useDeleteProject } from '@the-planner/data'
import { ProjectForm } from '../../components/project/project-form'
import { useMemo } from 'react'

const Lists = styled(ScrollableList)`
  > div {
    flex: 0 0 calc(100% - 24px);
  }
`

const Project = () => {
  const { setModal, clearModal } = useModal()

  const router = useRouter()
  const projectId = router.query.projectId as string

  const { project, error, isLoading } = useProject(projectId)

  const { onSubmit } = useEditProject(() => clearModal('project-edit'))
  const { deleteProjectHandler } = useDeleteProject(() => {
    clearModal('project-edit')
    router.back()
  })

  const editProjectHandler = () => {
    if (project) {
      setModal({
        id: 'project-edit',
        content: (
          <ProjectForm
            id="edit"
            title="Edit Project"
            onSubmit={onSubmit}
            defaultValues={project}
            onRequestClose={() => clearModal('project-edit')}
            onDelete={() => deleteProjectHandler(project)}
          />
        ),
      })
    }
  }

  const progress = useMemo(() => {
    return (
      (project &&
        +(
          (project.tasks.filter((task) => task.status === Status.COMPLETED)
            .length *
            100) /
          project._count.tasks
        ).toFixed(0)) ||
      0
    )
  }, [project])

  return (
    <>
      <x.main minHeight="100vh">
        <Header pageTitle={project ? project.title : ''}>
          <Button
            name="back"
            variant="outline"
            onClick={() => router.back()}
            ml={4}
            borderColor="layout-level0accent"
            borderRadius="full"
            p={1}
          >
            <x.span fontSize="1.5rem" color="content-contrast">
              <FiArrowLeft />
            </x.span>
          </Button>

          {project && !error ? (
            <Button
              name="edit project"
              variant="textOnly"
              color="information"
              onClick={editProjectHandler}
              mr="calc(24px - 0.5rem)"
            >
              Edit
            </Button>
          ) : (
            <div />
          )}
        </Header>

        {isLoading ? (
          <x.div px={4} display="flex" justifyContent="center">
            <Spinner pathColor="brand-primary" />
          </x.div>
        ) : error ? (
          <x.div px={4} display="flex" justifyContent="center">
            <ErrorMessage error={error} />
          </x.div>
        ) : (
          project && (
            <>
              <x.section overflow="hidden" px={4}>
                <x.h1 text="headline.two" lineHeight="tighter" mb={2}>
                  {project.title}
                </x.h1>

                {project.description?.length > 0 && (
                  <x.div mb={3} maxHeight="128px" overflowY="scroll">
                    <TextEditor value={project.description} readOnly />
                  </x.div>
                )}

                <LinearProgress color={project.color} percentage={progress} />
              </x.section>

              <x.h1 text="headline.three" px={4} mt={5} mb={2}>
                Tasks
              </x.h1>

              <Lists as="section" spaceX={3} mb={4}>
                <TasksLists
                  tasks={project.tasks as TaskWithProjectType[]}
                  showEmptyList
                  withDivider
                />
              </Lists>
            </>
          )
        )}

        {project && <CreateTaskButton />}
      </x.main>
    </>
  )
}

export default Project
