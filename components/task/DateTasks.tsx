import { x } from '@xstyled/styled-components'
import { format } from 'date-fns'
import { uniqueId } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { DATE_FORMAT } from '../../common/constants'
import { useNotification } from '../../common/contexts/NotificationCtx'
import useDateTasks from '../../common/data/useDateTasks'
import DateSelector from '../DateSelector'
import SkeletonList from '../skeletons/SkeletonList'
import TagSkeleton from '../skeletons/TagSkeleton'
import TaskItemSkeleton from '../skeletons/TaskItemSkeleton'
import NoTasks from './NoTasks'
import TasksLists from './TasksLists'

const DateTasks = () => {
  const router = useRouter()

  const [urlDate, setUrlDate] = useState(format(new Date(), DATE_FORMAT))

  const { dateTasks, isLoading, error } = useDateTasks(urlDate)

  const { setNotification } = useNotification()

  //set state if there is a valid date in URL
  useEffect(() => {
    if (router.query.d) {
      const date = new Date(router.query.d as string)

      if (date instanceof Date && !isNaN(date.valueOf())) {
        setUrlDate(date.toDateString())
      }
    }
  }, [router.isReady])

  //update url whenever state changes
  useEffect(() => {
    router.push(
      {
        query: {
          ...router.query,
          d: urlDate,
        },
      },
      // `/?d=${d.replaceAll(' ', '-')}`,
      undefined,
      { shallow: true }
    )
  }, [urlDate])

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

      <DateSelector dateString={urlDate} setUrlDate={setUrlDate} />

      <x.div px={4} overflowX='hidden'>
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
          <TasksLists tasks={dateTasks} date={urlDate} />
        )}
      </x.div>
    </x.section>
  )
}

export default DateTasks
