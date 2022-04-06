import { x } from '@xstyled/styled-components'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import DateSelector from '../DateSelector'
import TasksLists from './TasksLists'

const Tasks = () => {
  const router = useRouter()

  const [d, setDate] = useState(new Date().toDateString())

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

  return (
    <>
      <x.section my={4} mt={6}>
        <x.h1 text='headline.two' px={4} mb={3}>
          Tasks
        </x.h1>

        <DateSelector dateString={d} setDate={setDate} />

        <TasksLists dateString={d} />
      </x.section>
    </>
  )
}

export default Tasks
