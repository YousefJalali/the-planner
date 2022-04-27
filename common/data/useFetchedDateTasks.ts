import useSWR from 'swr'
import { TaskWithProjectType } from '../types/TaskType'
import { dateTaskKey } from './keys'

const useFetchedDateTasks = (date: string | null, from?: string) => {
  const { data, error } = useSWR(date ? dateTaskKey(date) : null)

  const dateTasks: TaskWithProjectType[] = data?.data || []
  const isLoading = !data

  return { dateTasks, error, isLoading }
}

export default useFetchedDateTasks
