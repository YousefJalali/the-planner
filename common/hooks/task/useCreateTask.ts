import { uniqueId } from 'lodash'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import { createTask } from '../../actions/taskActions'
import { useNotification } from '../../contexts/NotificationCtx'
import { TaskType } from '../../types/TaskType'
import addServerErrors from '../../utils/addServerErrors'
import { dateTaskKey, projectKey } from '../../data/keys'

const useCreateTask = (callback: (action?: any) => void) => {
  const [isSubmitting, setSubmit] = useState(false)

  const { setNotification } = useNotification()

  const router = useRouter()

  const { mutate } = useSWRConfig()

  let defaultValues = {}
  if (router.query.projectId) {
    defaultValues = {
      ...defaultValues,
      projectId: router.query.projectId as string,
    }
  }
  if (router.query.d) {
    defaultValues = {
      ...defaultValues,
      startDate: new Date((router.query.d as string).replaceAll('-', ' ')),
    }
  }

  const onSubmit = async (
    formData: TaskType,
    setError: UseFormSetError<TaskType>
  ) => {
    setSubmit(true)

    const { data, error, validationErrors } = await createTask(formData)

    setSubmit(false)
    if (validationErrors) {
      addServerErrors(validationErrors, setError)
    } else {
      //mutate with validation
      mutate(dateTaskKey(formData.startDate))
      mutate(projectKey(formData.projectId))

      if (data) {
        callback()

        setNotification({
          id: uniqueId(),
          message: 'Task created successfully',
          variant: 'confirmation',
        })
      }

      if (error) {
        setNotification({
          id: uniqueId(),
          message: error,
          variant: 'critical',
        })
      }
    }
  }

  return { isSubmitting, onSubmit, defaultValues }
}

export default useCreateTask
