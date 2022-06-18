import _ from 'lodash'
import { uniqueId } from 'lodash'
import { useRouter } from 'next/router'
import { editProject } from '../../actions'
import { useNotification } from '../../contexts/NotificationCtx'
import { useProject } from '../../data/query'
import { ProjectType } from '@the-planner/types'
import { getErrorMessage } from '@the-planner/utils'

export const useEditProject = (callback: (action?: any) => void) => {
  const { setNotification } = useNotification()

  const router = useRouter()
  const { projectId } = router.query
  const { mutate: mutateProject, project } = useProject(projectId as string)

  const onSubmit = async (formData: ProjectType) => {
    const request = async () => {
      try {
        const {
          data: updatedProject,
          error,
          validationErrors,
        } = await editProject(_.omit(formData, 'tasks', '_count'))
        // } = await editProject(formData)

        // if (validationErrors) {
        //   showForm(formData, validationErrors)
        //   return null
        // }

        if (error) {
          throw new Error(error)
        }

        setNotification({
          id: uniqueId(),
          message: 'project updated!',
          variant: 'confirmation',
        })

        return updatedProject
      } catch (error) {
        setNotification({
          id: uniqueId(),
          message: getErrorMessage(error),
          variant: 'critical',
          // action: 'try again',
          // actionFn: () => showForm(formData),
        })
      }
    }

    const updatedProject = {
      data: {
        ...formData,
      },
    }

    mutateProject(
      async () => {
        const updatedProject = await request()

        if (!updatedProject) {
          return { data: project }
        }

        return {
          data: updatedProject,
        }
      },
      {
        optimisticData: updatedProject,
        rollbackOnError: true,
      }
    )

    callback()
  }

  return { onSubmit }
}

export default useEditProject
