import CreateProject from './create-project'

export const NewProjectCard = () => {
  return (
    <div className="prose w-full bg-base-100 mx-auto flex flex-col items-center text-center">
      <h3>No active projects</h3>
      <p>Create your first project now</p>

      <CreateProject />
    </div>
  )
}

export default NewProjectCard
