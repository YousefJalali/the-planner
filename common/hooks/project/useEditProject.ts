import { uniqueId } from 'lodash'
import { useState } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import { editProject } from '../../actions/projectActions'
import { useNotification } from '../../contexts/NotificationCtx'
import { dateTaskKey, projectKey } from '../../data/keys'
import { ProjectType } from '../../types/ProjectType'
import addServerErrors from '../../utils/validations/addServerErrors'

const useEditProject = (callback?: (action?: any) => void) => {
  const [isSubmitting, setSubmit] = useState(false)

  const { setNotification } = useNotification()

  const { mutate } = useSWRConfig()

  const onSubmit = async (
    formData: ProjectType,
    setError: UseFormSetError<ProjectType>
  ) => {
    if (callback) {
      callback()
    }

    const request = async () => {
      const { data, error, validationErrors } = await editProject(formData)

      mutate(projectKey(formData.id))

      if (validationErrors) {
        return addServerErrors(validationErrors, setError)
      }

      if (error) {
        setNotification({
          id: uniqueId(),
          message: error,
          variant: 'critical',
          action: 'try again',
          actionFn: async () => {
            setSubmit(true)

            setNotification({
              id: uniqueId(),
              message: 'deleting...',
              variant: 'critical',
              loading: isSubmitting,
            })

            await request()

            setSubmit(false)
          },
        })
      } else {
        setNotification({
          id: uniqueId(),
          message: 'Project updated successfully',
          variant: 'confirmation',
        })
      }
    }

    await request()
  }

  return { onSubmit }
}

export default useEditProject
