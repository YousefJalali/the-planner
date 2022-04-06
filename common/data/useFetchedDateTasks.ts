import useSWR from 'swr'
import { APIErrorType } from '../types/APIErrorType'
import { TaskType } from '../types/TaskType'

const getDateTasks = async (date: string | null) => {
  if (!date) {
    throw Error('No id')
  }

  const res = await fetch(`/tasks/${date}`)

  if (!res.ok) {
    const error = new Error(
      'An error occurred while fetching the data.'
    ) as APIErrorType

    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status

    throw error
  }

  const data: TaskType[] = await res.json()
  return data
}

const useFetchedDateTasks = (date: string | null, from: string) => {
  // console.log('useFetchedDateTasks from ', from, date)

  const { data, error, mutate } = useSWR(date ? `/tasks/${date}` : null, () =>
    getDateTasks(date)
  )

  const dateTasks = data || []
  const isLoading = !data
  const setDateTasks = mutate

  return { dateTasks, setDateTasks, error, isLoading }
}

export default useFetchedDateTasks
