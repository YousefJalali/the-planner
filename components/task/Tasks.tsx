import { x } from '@xstyled/styled-components'
import { uniqueId } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useNotification } from '../../common/contexts/NotificationCtx'
import useFetchedDateTasks from '../../common/data/useFetchedDateTasks'
import DateSelector from '../DateSelector'
import SkeletonList from '../skeletons/SkeletonList'
import TagSkeleton from '../skeletons/TagSkeleton'
import TaskItemSkeleton from '../skeletons/TaskItemSkeleton'
import NoTasks from './NoTasks'
import TasksLists from './TasksLists'

const Tasks = () => {
  const router = useRouter()

  const [d, setDate] = useState(new Date().toDateString())

  const { dateTasks, isLoading, error } = useFetchedDateTasks(d, 'Tasks')

  const { setNotification } = useNotification()

  //set state if there is a valid date in URL
  useEffect(() => {
    if (router.query.d) {
      const date = new Date((router.query.d as string).replaceAll('-', ' '))

      if (date instanceof Date && !isNaN(date.valueOf())) {
        setDate(date.toDateString())
      }
    }
  }, [router.isReady])

  //update url whenever state changes
  useEffect(() => {
    router.push(
      {
        query: {
          ...router.query,
          d: d.replaceAll(' ', '-'),
        },
      },
      // `/?d=${d.replaceAll(' ', '-')}`,
      undefined,
      { shallow: true }
    )
  }, [d])

  useEffect(() => {
    if (error) {
      setNotification({
        id: uniqueId(),
        message: 'Failed to fetch tasks, try again!',
        variant: 'critical',
      })
    }
  }, [error])

  return (
    <x.section my={4} mt={6}>
      <x.h1 text='headline.two' px={4} mb={3}>
        Tasks
      </x.h1>

      <DateSelector dateString={d} setDate={setDate} />

      <x.div px={4}>
        {error ? (
          <NoTasks />
        ) : isLoading ? (
          <>
            <TagSkeleton />

            <x.ul spaceY={4} mt={2}>
              <SkeletonList component={<TaskItemSkeleton />} length={5} />
            </x.ul>
          </>
        ) : dateTasks && dateTasks.length <= 0 ? (
          <NoTasks />
        ) : (
          <x.ul>
            <TasksLists tasks={dateTasks} />
          </x.ul>
        )}
      </x.div>
    </x.section>
  )
}

export default Tasks
