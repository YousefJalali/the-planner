import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { TaskWithProjectType } from '../types/TaskType'
import customFetch from '../utils/customFetch'
import getErrorMessage from '../utils/getErrorMessage'
import { dateTasksKey } from './keys'

const useDateTasks = (date: string | null) => {
  const { data, error, mutate } = useSWR(
    date ? dateTasksKey(date) : null,
    customFetch,
    {
      use: [requestLogger],
    }
  )

  const dateTasks: TaskWithProjectType[] = data?.data || []
  const isLoading = !data
  const errorMessage = getErrorMessage(error)

  return { dateTasks, error: errorMessage, isLoading, mutate }
}

export default useDateTasks
