import { useNotification } from '@the-planner/hooks'
import { useEffect } from 'react'
import DateTasksEmpty from './date-tasks-empty'
import { v4 as uuid } from 'uuid'

const DateTasksError = () => {
  const { setNotification } = useNotification()

  useEffect(() => {
    setNotification({
      id: uuid(),
      message: 'Failed to fetch tasks, try again!',
      variant: 'critical',
    })
  }, [])

  return <DateTasksEmpty />
}

export default DateTasksError
