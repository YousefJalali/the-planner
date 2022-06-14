import { x } from '@xstyled/styled-components'
import { FC, useEffect, useState } from 'react'
import { useCopyToClipboard } from '@the-planner/hooks'
import { projects, tasks } from '../mocks/handlers'

const Sample: FC = () => {
  const [value, copy] = useCopyToClipboard()
  const [loading, setLoading] = useState(false)

  const copyProjects = async () => {
    setLoading(true)
    const p = await JSON.stringify(projects)
    copy(p)
    setLoading(false)
  }
  const copyTasks = async () => {
    setLoading(true)
    const p = await JSON.stringify(tasks)
    copy(p)
    setLoading(false)
  }

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <x.button p={4} onClick={copyProjects}>
            projects
          </x.button>
          <hr />
          <x.button p={4} onClick={copyTasks}>
            tasks
          </x.button>
        </>
      )}
    </div>
  )
}

export default Sample
