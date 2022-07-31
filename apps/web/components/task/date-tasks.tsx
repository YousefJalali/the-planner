import { x } from '@xstyled/styled-components'
import { format, parse } from 'date-fns'
import { uniqueId } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import { useNotification } from '@the-planner/hooks'
import { useDateTasks } from '@the-planner/data'
import {
  formatToUrlDate,
  parseUrlDate,
  URL_DATE_FORMAT,
} from '@the-planner/utils'
import { NoTasksSvg, EmptyState } from '@the-planner/ui-web'

import { DateSelector } from '../date-selector'
import { SkeletonList, TagSkeleton, TaskItemSkeleton } from '../skeletons'
import TasksLists from './tasks-list'
import CreateTaskButton from './create-task-button'

const Empty = () => (
  <EmptyState
    illustration={<NoTasksSvg />}
    title="No pending tasks today"
    description=" Write down some tasks "
  />
)

const DateTasks = () => {
  const router = useRouter()

  const [urlDate, setUrlDate] = useState(formatToUrlDate(new Date()))
  // const [urlDate, setUrlDate] = useState(format(new Date(), URL_DATE_FORMAT))

  const { dateTasks, isLoading, error } = useDateTasks(urlDate)

  const { setNotification } = useNotification()

  //set state if there is a valid date in URL
  useEffect(() => {
    if (router.query.d) {
      const parsedDate = parseUrlDate(router.query.d as string)
      // const parsedDate = parse(
      //   router.query.d as string,
      //   URL_DATE_FORMAT,
      //   new Date()
      // )

      if (parsedDate instanceof Date && !isNaN(parsedDate.valueOf())) {
        setUrlDate(formatToUrlDate(parsedDate))
        // setUrlDate(format(parsedDate, URL_DATE_FORMAT))
      }
    }
  }, [router.isReady])

  useEffect(() => {
    if (error) {
      setNotification({
        id: uniqueId(),
        message: 'Failed to fetch tasks, try again!',
        variant: 'critical',
      })
    }
  }, [error])

  const changeHandler = (date: string) => {
    //update url whenever state changes
    const newUrl = `/?d=${date}`
    window.history.replaceState(
      { ...window.history.state, as: newUrl, url: newUrl },
      '',
      newUrl
    )

    //update state
    setUrlDate(date)
  }

  const dateSelect = useMemo(
    () => <DateSelector dateString={urlDate} setUrlDate={changeHandler} />,
    [urlDate]
  )

  return (
    <>
      <x.section my={4} mt={6}>
        <x.h1 text="headline.two" px={4} mb={3}>
          Tasks
        </x.h1>

        {dateSelect}

        <x.div px={4} overflowX="hidden">
          {error ? (
            <Empty />
          ) : isLoading ? (
            <x.div spaceY={2}>
              <TagSkeleton />
              <SkeletonList component={<TaskItemSkeleton />} />
            </x.div>
          ) : dateTasks && dateTasks.length <= 0 ? (
            <Empty />
          ) : (
            <TasksLists tasks={dateTasks} />
          )}
        </x.div>
      </x.section>

      <CreateTaskButton date={urlDate} />
    </>
  )
}

export default DateTasks
