import { projects, tasks } from '../mocks/handlers'
const sample = () => {
  return (
    <div>
      <div>{JSON.stringify(projects)}</div>
      <hr />
      <div>horrraaa</div>
      <div>{JSON.stringify(tasks)}</div>
    </div>
  )
}

export default sample
