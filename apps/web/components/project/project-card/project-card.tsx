import { FC, useMemo } from 'react'
import { ProjectTasksCount, ProjectWithTasks } from '@the-planner/types'
import { Status } from '@prisma/client'

type Props = {
  project: ProjectWithTasks & ProjectTasksCount
  onClick: () => void
}

export const ProjectCard: FC<Props> = ({ project, onClick }) => {
  const progress = useMemo(
    () =>
      +(
        (project.tasks.filter((task) => task.status === Status.COMPLETED)
          .length *
          100) /
        project._count.tasks
      ).toFixed(0) || 0,
    [project]
  )

  return (
    <div
      className="w-full h-[150px] p-4 flex justify-between rounded-xl cursor-pointer ring-2 hover:ring-offset-2 transition-all"
      style={{
        background: `linear-gradient(135deg, ${project.color}0D 0%, ${project.color}4D 100%)`,
        //@ts-ignore
        '--tw-ring-color': `${project.color}20`,
      }}
      onClick={onClick}
    >
      <div className="flex flex-col justify-between">
        <h1 className="text-2xl font-semibold">{project.title}</h1>
        <p className="mt-4 text-sm opacity-60">{project._count.tasks} Tasks</p>
      </div>

      <div
        className="radial-progress"
        //@ts-ignore
        style={{ '--value': 70, color: project.color }}
      >
        {progress}%
      </div>
    </div>
  )
}

export default ProjectCard
