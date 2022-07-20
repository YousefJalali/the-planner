import { FC } from 'react'
import { ProjectTasksCount, ProjectWithTasksType } from '@the-planner/types'
import { CircleProgress } from '@the-planner/ui-web'
import { x } from '@xstyled/styled-components'
import { Status } from '@prisma/client'
import { Card } from './card'

type Props = {
  project: ProjectWithTasksType & ProjectTasksCount
  onClick: () => void
}

const ProjectCard: FC<Props> = ({ project, onClick }) => {
  // console.log('Project Card render', project)

  const progress =
    +(
      (project.tasks.filter((task) => task.status === Status.COMPLETED).length *
        100) /
      project._count.tasks
    ).toFixed(0) || 0

  return (
    <Card color={project.color} onClick={onClick}>
      <x.div
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        flex="0 0 calc(75% - 8px)"
      >
        <x.p color="content-contrast" fontSize="xl">
          {project.title}
        </x.p>
        <x.p color="content-nonessential" fontSize="sm" mt={3}>
          {project._count.tasks} Tasks
        </x.p>
      </x.div>
      <x.div flex="0 0 25%">
        <CircleProgress color={project.color} percentage={progress} />
      </x.div>
    </Card>
  )
}

export default ProjectCard
