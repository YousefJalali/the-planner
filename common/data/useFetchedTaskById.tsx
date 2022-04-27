import useSWR from 'swr'
import { TaskType } from '../types/TaskType'
import { taskKey } from './keys'

const useFetchedTaskById = (taskId: string | null) => {
  const { data, error } = useSWR<{ data: TaskType; error: Error }, Error>(
    taskId ? taskKey(taskId) : null
  )

  const task = data?.data || null
  const isLoading = !error && !data

  return { task, error, isLoading }
}

export default useFetchedTaskById
