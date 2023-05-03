import { FC, useState } from 'react'
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
          <button onClick={copyProjects}>projects</button>
          <hr />
          <button onClick={copyTasks}>tasks</button>
        </>
      )}
    </div>
  )
}

export default Sample
