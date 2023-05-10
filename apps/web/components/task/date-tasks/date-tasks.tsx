import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import { formatToUrlDate, parseUrlDate } from '@the-planner/utils'

import { DateSelector } from '../date-selector'
import DateTasksList from './date-tasks-list'

export const DateTasks = () => {
  const router = useRouter()

  const [urlDate, setUrlDate] = useState(formatToUrlDate(new Date()))

  //set state if there is a valid date in URL
  useEffect(() => {
    if (router.query.d) {
      const parsedDate = parseUrlDate(router.query.d as string)

      if (parsedDate instanceof Date && !isNaN(parsedDate.valueOf())) {
        setUrlDate(formatToUrlDate(parsedDate))
      }
    }
  }, [router.isReady])

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
      <h1 className="text-2xl font-bold px-6 lg:mt-6 w-full">Tasks</h1>

      {dateSelect}

      <DateTasksList date={urlDate} />
    </>
  )
}

export default DateTasks
