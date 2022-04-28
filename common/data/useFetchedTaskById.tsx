import useSWR from 'swr'
import { TaskWithProjectType } from '../types/TaskType'
import { taskKey } from './keys'

const useFetchedTaskById = (taskId: string | null) => {
  const { data, error } = useSWR<
    { data: TaskWithProjectType; error: Error },
    Error
  >(taskId ? taskKey(taskId) : null)

  console.log(data)

  const task = data?.data || null
  const isLoading = !error && !data

  return { task, error, isLoading }
}

export default useFetchedTaskById
