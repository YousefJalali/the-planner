import { Project } from '@the-planner/types'
import { Header } from '@the-planner/ui-web'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import EditProject from './project-details-edit'

export const ProjectDetailsHeader = ({ project }: { project: Project }) => {
  const router = useRouter()

  const backButton = useMemo(
    () => (
      <a
        onClick={() => router.back()}
        className="btn btn-ghost btn-circle -ml-4"
      >
        <FiArrowLeft size={18} />
      </a>
    ),
    []
  )

  return (
    <Header pageTitle={project ? project.title : ''} className="py-3">
      {backButton}

      {project ? <EditProject project={project} /> : <div />}
    </Header>
  )
}

export default ProjectDetailsHeader
