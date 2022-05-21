import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { TaskWithProjectType } from '../types/TaskType'
import customFetch from '../utils/customFetch'
import getErrorMessage from '../utils/getErrorMessage'
import { dateTasksKey } from './keys'

const useDateTasks = (date: string | null) => {
  const res = useSWR(date ? dateTasksKey(date) : null, customFetch, {
    use: [requestLogger],
  })

  const { data, error, mutate } = res
  console.log(res, data, date)

  const dateTasks: TaskWithProjectType[] = data?.data || []
  const isLoading = !data && !error
  const errorMessage = getErrorMessage(error)

  return { dateTasks, error: errorMessage, isLoading, mutate }
}

export default useDateTasks
