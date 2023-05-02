import { TaskWithProject } from '@the-planner/types'
import { TasksLists } from '../../task/tasks-list'

export const ProjectTasks = ({ tasks }: { tasks: TaskWithProject[] }) => {
  return (
    <>
      <h1 className="text-2xl px-6 mt-12 mb-2 font-bold">Tasks</h1>
      <section className="flex overflow-x-scroll space-x-3 mb-6 scroll-pl-9 px-6 snap-x [&>div]:snap-start [&>div]:flex-[0_0_calc(100%-1.5rem)]">
        <TasksLists tasks={tasks} showEmptyList withDivider />
      </section>
    </>
  )
}

export default ProjectTasks
