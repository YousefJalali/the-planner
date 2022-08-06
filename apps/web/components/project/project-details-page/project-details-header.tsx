import { ProjectType } from '@the-planner/types'
import { Button, Header } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import EditProject from './project-details-edit'

export const ProjectDetailsHeader = ({ project }: { project: ProjectType }) => {
  const router = useRouter()

  const backButton = useMemo(
    () => (
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
    ),
    []
  )

  return (
    <Header pageTitle={project ? project.title : ''}>
      {backButton}

      {project ? <EditProject project={project} /> : <div />}
    </Header>
  )
}

export default ProjectDetailsHeader
