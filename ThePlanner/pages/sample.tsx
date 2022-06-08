import { x } from '@xstyled/styled-components'
import { useEffect, useState } from 'react'
import useCopyToClipboard from '../common/hooks/useCopyToClipboard'
import { projects, tasks } from '../mocks/handlers'

const sample = () => {
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

export default sample
