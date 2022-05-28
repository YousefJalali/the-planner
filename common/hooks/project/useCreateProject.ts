import ObjectID from 'bson-objectid'
import { uniqueId } from 'lodash'
import { useRouter } from 'next/router'
import { UseFormSetError } from 'react-hook-form'

import { createProject } from '../../actions/projectActions'
import { useNotification } from '../../contexts/NotificationCtx'
import useInfiniteProjects, { LIMIT } from '../../data/useInfiniteProjects'
import useProjects from '../../data/useProjects'
import {
  ProjectTasksCount,
  ProjectType,
  ProjectWithTasksAndCount,
  ProjectWithTasksType,
} from '../../types/ProjectType'
import getErrorMessage from '../../utils/getErrorMessage'

// const updateInfiniteProjects = (
//   newProject: ProjectType | ProjectWithTasksAndCount,
//   projects: (ProjectWithTasksType & ProjectTasksCount)[]
// ) => {
//   const updatedProjects = [{ ...newProject }, ...projects]

//   const splitProjects = []

//   for (let i = 0; i < updatedProjects.length; i += LIMIT) {
//     splitProjects.push({
//       data: updatedProjects.slice(i, i + LIMIT),
//       nextCursor: updatedProjects[i + LIMIT + 1].id,
//     })
//   }

//   return [...splitProjects]
// }

const useCreateProject = (callback: (action?: any) => void) => {
  const { setNotification } = useNotification()

  const router = useRouter()
  const { pathname } = router

  const { mutate: mutateInfiniteProjects, projects: infiniteProjects } =
    useInfiniteProjects()
  const { mutate: mutateProjects, projects } = useProjects()

  const onSubmit = async (formData: ProjectType) => {
    const projectFormData = {
      ...formData,
      id: ObjectID().toHexString(),
    }

    const request = async () => {
      try {
        const {
          data: createdProject,
          error,
          validationErrors,
        } = await createProject(projectFormData)

        // if (validationErrors) {
        //   showForm(projectFormData, validationErrors)
        //   return null
        // }

        if (error) {
          throw new Error(error)
        }

        setNotification({
          id: uniqueId(),
          message: 'project created!',
          variant: 'confirmation',
        })

        return createdProject as ProjectWithTasksAndCount
      } catch (error) {
        setNotification({
          id: uniqueId(),
          message: getErrorMessage(error),
          variant: 'critical',
          // action: 'try again',
          // actionFn: () => showForm(projectFormData),
        })
      }
    }

    if (pathname === '/projects') {
      await request()
      mutateInfiniteProjects()
    } else {
      const updatedProjects = {
        data: [{ ...projectFormData }, ...projects],
      }

      mutateProjects(
        async () => {
          const createdProject = await request()

          return {
            data: createdProject ? [createdProject, ...projects] : projects,
          }
        },
        {
          optimisticData: updatedProjects,
          rollbackOnError: true,
        }
      )
    }

    callback()
  }

  return { onSubmit }
}

export default useCreateProject
