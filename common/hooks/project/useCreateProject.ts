import ObjectID from 'bson-objectid'
import { useState } from 'react'
import { UseFormSetError } from 'react-hook-form'

import { createProject } from '../../actions/projectActions'
import { useNotification } from '../../contexts/NotificationCtx'
import useInfiniteProjects from '../../data/useInfiniteProjects'
import { ProjectType } from '../../types/ProjectType'
import addServerErrors from '../../utils/addServerErrors'

const useCreateProject = (callback: (action?: any) => void) => {
  const [isSubmitting, setSubmit] = useState(false)

  const { setNotification } = useNotification()

  const { mutate } = useInfiniteProjects()

  const onSubmit = async (
    formData: ProjectType,
    setError: UseFormSetError<ProjectType>
  ) => {
    const request = async () => {
      setSubmit(true)
      //send request
      const { data, error, validationErrors } = await createProject(formData)

      const revalidate = await mutate()
      setSubmit(false)

      callback()

      if (validationErrors) {
        addServerErrors(validationErrors, setError)
      } else {
        if (error) {
          setNotification({
            id: ObjectID().toHexString(),
            message: error,
            variant: 'critical',
            action: 'try again',
            actionFn: async () => {
              setNotification({
                id: ObjectID().toHexString(),
                message: 'Creating...',
                variant: 'information',
                loading: true,
              })
              setTimeout(async () => {
                await request()
              }, 3000)
            },
          })
        }

        if (data) {
          setNotification({
            id: ObjectID().toHexString(),
            message: 'Project created!',
            variant: 'information',
          })
        }
      }
    }

    await request()
  }

  return { isSubmitting, onSubmit }
}

export default useCreateProject
