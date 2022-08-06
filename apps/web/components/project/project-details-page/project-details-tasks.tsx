import styled, { x } from '@xstyled/styled-components'
import { TaskWithProjectType } from '@the-planner/types'
import { ScrollableList } from '@the-planner/ui-web'
import { TasksLists } from '../../task/tasks-list'

const Lists = styled(ScrollableList)`
  > div {
    flex: 0 0 calc(100% - 24px);
  }
`

export const ProjectTasks = ({ tasks }: { tasks: TaskWithProjectType[] }) => {
  return (
    <>
      <x.h1 text="headline.three" px={4} mt={5} mb={2}>
        Tasks
      </x.h1>
      <Lists as="section" spaceX={3} mb={4}>
        <TasksLists tasks={tasks} showEmptyList withDivider />
      </Lists>
    </>
  )
}

export default ProjectTasks
