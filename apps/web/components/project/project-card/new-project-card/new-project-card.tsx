import NewProject from './create-button'

export const NewProjectCard = () => {
  return (
    <div className="card w-full bg-secondary text-secondary-content">
      <div className="card-body p-6">
        <h2 className="card-title">No active projects</h2>
        <p>Create your first project now</p>
        <div className="card-actions justify-end">
          <NewProject />
        </div>
      </div>
    </div>
  )
}

export default NewProjectCard
