import { x } from '@xstyled/styled-components'
import Image from 'next/image'
import { useMemo } from 'react'
import useFetchedDateTasks from '../../common/data/useFetchedDateTasks'
import { Status } from '../../common/types/TaskType'
import NoTasks from './NoTasks'
import TasksList from './TasksList'

const TasksLists = ({ dateString }: { dateString: string }) => {
  console.log('TasksLists rendered')

  const date = useMemo(() => new Date(dateString), [dateString])

  const { dateTasks, setDateTasks, error, isLoading } = useFetchedDateTasks(
    dateString,
    'TasksLists'
  )

  // render date tasks
  const inProgressTasks = useMemo(() => {
    console.log('inProgressTasks called')
    return dateTasks.filter((task) => task.status === Status.INPROGRESS)
  }, [dateTasks])

  const proposedTasks = useMemo(
    () => dateTasks.filter((task) => task.status === Status.PROPOSED),
    [dateTasks]
  )

  const completedTasks = useMemo(
    () => dateTasks.filter((task) => task.status === Status.COMPLETED),
    [dateTasks]
  )

  return (
    <>
      {inProgressTasks && inProgressTasks.length > 0 && (
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
          />
        </x.div>
      )}

      {proposedTasks && proposedTasks.length > 0 ? (
        <x.div px={4} mt={4}>
          <x.span
            display='block'
            mb={2}
            color={`tag-${Status.PROPOSED}`}
            textTransform='capitalize'
          >
            • {Status.PROPOSED}
          </x.span>
          <TasksList
            id={`${Status.PROPOSED}-tasks-list`}
            tasks={proposedTasks}
          />
        </x.div>
      ) : (
        <x.div px={4}>
          {/* <NoTasks /> */}
          <Image src='/noTask.svg' width={100} height={100} />
        </x.div>
      )}

      {completedTasks && completedTasks.length > 0 && (
        <x.div px={4} mt={4}>
          <x.span
            display='block'
            mb={2}
            color={`tag-${Status.COMPLETED}`}
            textTransform='capitalize'
          >
            • {Status.COMPLETED}
          </x.span>
          <TasksList
            id={`${Status.COMPLETED}-tasks-list`}
            tasks={completedTasks}
          />
        </x.div>
      )}
    </>
  )
}

export default TasksLists
