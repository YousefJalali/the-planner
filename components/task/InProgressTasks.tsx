import { x } from '@xstyled/styled-components'
import { useMemo, useState } from 'react'
import useFetchedDateTasks from '../../common/data/useFetchedDateTasks'
import { Status } from '../../common/types/TaskType'
import TasksList from './TasksList'

const InProgressTasks = () => {
  const [date, setDate] = useState('Tue Mar 22 2022')

  const {
    dateTasks,
    setDateTasks,
    error: dateTasksError,
    isLoading: isDateTasksLoading,
  } = useFetchedDateTasks(date, 'InProgressTasks')

  const inProgressTasks = useMemo(() => {
    console.log('called')
    return dateTasks.filter((task) => task.status === Status.INPROGRESS)
  }, [dateTasks])

  return inProgressTasks && inProgressTasks.length > 0 ? (
    <x.div px={4}>
      <x.span
        display='block'
        mb={2}
        color={`tag-${Status.INPROGRESS}`}
        textTransform='capitalize'
      >
        • {Status.INPROGRESS}
      </x.span>

      <TasksList
        id={`${Status.INPROGRESS}-tasks-list`}
        tasks={inProgressTasks}
        date={date}
      />
    </x.div>
  ) : null
}

export default InProgressTasks
