import useSWR from 'swr'
import { TaskType } from '../types/TaskType'

const getDateTasks = async (date: string) => {
  const res = await fetch(`/tasks/${date}`)
  const data: TaskType[] = await res.json()
  return data
}

const useFetchedDateTasks = (date: string) => {
  const { data, error, mutate } = useSWR(date ? `/tasks/${date}` : null, () =>
    getDateTasks(date)
  )

  const dateTasks = data || []
  const isLoading = !data
  const setDateTasks = mutate

  return { dateTasks, setDateTasks, error, isLoading }
}

export default useFetchedDateTasks
