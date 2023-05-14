import { useNotification } from '@the-planner/hooks'
import { useEffect } from 'react'
import EmptyTasks from './empty-tasks'
import { v4 as uuid } from 'uuid'

const TasksError = () => {
  const { setNotification } = useNotification()

  useEffect(() => {
    setNotification({
      id: uuid(),
      message: 'Failed to fetch tasks, try again!',
      variant: 'error',
    })
  }, [])

  return <EmptyTasks />
}

export default TasksError
