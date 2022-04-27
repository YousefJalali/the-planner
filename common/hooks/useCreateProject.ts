import { uniqueId } from 'lodash'
import { useState } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import { createProject } from '../actions/projectActions'
import { useNotification } from '../contexts/NotificationCtx'
import { projectsKey } from '../data/keys'
import { addProjectToLocalProjects } from '../data/localData/localProjectsData'
import { ProjectType } from '../types/ProjectType'
import addServerErrors from '../utils/validations/addServerErrors'

const useCreateProject = (callback: (action?: any) => void) => {
  const [isSubmitting, setSubmit] = useState(false)

  const { mutate } = useSWRConfig()

  const { setNotification } = useNotification()

  const onSubmit = async (
    formData: ProjectType,
    setError: UseFormSetError<ProjectType>
  ) => {
    //mutate project locally
    mutate(
      projectsKey(),
      (data: { data: ProjectType[] }) =>
        data && addProjectToLocalProjects(data.data, formData),
      false
    )

    const request = async () => {
      setSubmit(true)

      //send request
      const { data, error, validationErrors } = await createProject(formData)

      setSubmit(false)

      mutate(projectsKey())

      if (validationErrors) {
        addServerErrors(validationErrors, setError)
      } else {
        callback()

        if (error) {
          setNotification({
            id: uniqueId(),
            message: error,
            variant: 'critical',
            action: 'try again',
            actionFn: async () => {
              setNotification({
                id: uniqueId(),
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
            id: uniqueId(),
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
