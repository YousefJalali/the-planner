import useSWR from 'swr'
import { requestLogger } from '../middlewares/requestLogger'
import { TaskWithProjectType } from '../types/TaskType'
import customFetch from '../utils/customFetch'
import { dateTaskKey } from './keys'

const useDateTasks = (date: string | null) => {
  const { data, error, mutate } = useSWR(
    date ? dateTaskKey(date) : null,
    customFetch,
    {
      use: [requestLogger],
    }
  )

  const dateTasks: TaskWithProjectType[] = data?.data || []
  const isLoading = !data

  return { dateTasks, error, isLoading, mutate }
}

export default useDateTasks
