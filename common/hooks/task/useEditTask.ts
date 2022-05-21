import { uniqueId } from 'lodash'
import { useState } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import { editTask } from '../../actions/taskActions'
import { useNotification } from '../../contexts/NotificationCtx'
import { dateTasksKey, projectKey } from '../../data/keys'
import { TaskType } from '../../types/TaskType'
import addServerErrors from '../../utils/addServerErrors'

const useEditTask = (callback?: (action?: any) => void) => {
  const [isSubmitting, setSubmit] = useState(false)

  const { setNotification } = useNotification()

  const { mutate } = useSWRConfig()

  const onSubmit = async (
    formData: TaskType,
    setError: UseFormSetError<TaskType>
  ) => {
    setSubmit(true)

    const { data, error, validationErrors } = await editTask(formData)

    setSubmit(false)

    if (validationErrors) {
      addServerErrors(validationErrors, setError)
    } else {
      //mutate with validation
      mutate(dateTasksKey(formData.startDate))
      mutate(projectKey(formData.projectId))

      if (data) {
        if (callback) {
          callback()
        }

        setNotification({
          id: uniqueId(),
          message: 'Task updated successfully',
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

  return { isSubmitting, onSubmit }
}

export default useEditTask
