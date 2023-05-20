import { useState } from 'react'
import { Project } from '@the-planner/types'
import { useRouter } from 'next/router'
import { useDeleteProject, useEditProject } from '@the-planner/data'
import ProjectForm from './project-form'
import { Modal } from '../ui'

export function EditProject({
  project,
  children,
}: {
  project: Project
  children: (handler: () => void) => JSX.Element
}) {
  const [modal, showModal] = useState(false)

  const router = useRouter()

  const { onSubmit } = useEditProject({ projectId: project.id })

  const { onDelete } = useDeleteProject({ projectId: project.id })

  return (
    <>
      {children(() => showModal(true))}

      <Modal
        id="project-edit"
        isOpen={modal}
        dismiss={() => showModal(false)}
        closeButton
      >
        <ProjectForm
          id="edit"
          onSubmit={(formData) => onSubmit(formData, () => showModal(false))}
          defaultValues={project}
          onDelete={() =>
            onDelete(project, () => {
              router.back()
              showModal(false)
            })
          }
        />
      </Modal>
    </>
  )
}

export default EditProject
