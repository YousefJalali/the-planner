import { x } from '@xstyled/styled-components'
import { format, parse } from 'date-fns'
import { uniqueId } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { URL_DATE_FORMAT } from '../../common/constants'
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

  const [urlDate, setUrlDate] = useState(format(new Date(), URL_DATE_FORMAT))

  const { dateTasks, isLoading, error } = useDateTasks(urlDate)

  const { setNotification } = useNotification()

  //set state if there is a valid date in URL
  useEffect(() => {
    if (router.query.d) {
      const parsedDate = parse(
        router.query.d as string,
        URL_DATE_FORMAT,
        new Date()
      )

      if (parsedDate instanceof Date && !isNaN(parsedDate.valueOf())) {
        setUrlDate(format(parsedDate, URL_DATE_FORMAT))
      }
    }
  }, [router.isReady])

  //update url whenever state changes
  useEffect(() => {
    const newUrl = `/?d=${urlDate}`

    window.history.replaceState(
      { ...window.history.state, as: newUrl, url: newUrl },
      '',
      newUrl
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
          <TasksLists tasks={dateTasks} />
        )}
      </x.div>
    </x.section>
  )
}

export default DateTasks
