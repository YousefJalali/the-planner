import ObjectID from 'bson-objectid'
import { uniqueId } from 'lodash'
import { useRouter } from 'next/router'

import { useNotification } from '@the-planner/hooks'
import { ProjectType, ProjectWithTasksAndCount } from '@the-planner/types'
import { getErrorMessage } from '@the-planner/utils'

import { createProject } from '../actions'
import { useInfiniteProjects, useProjects } from '../query'

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

export const useCreateProject = (callback?: (action?: any) => void) => {
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

    if (callback) {
      callback()
    }
  }

  return { onSubmit }
}

export default useCreateProject
