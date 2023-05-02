import { x } from '@xstyled/styled-components'
import { FiCalendar } from 'react-icons/fi'
import { Status, TaskWithProject } from '@the-planner/types'
import { formatDate, statusAlias } from '@the-planner/utils'
import { Details, Title } from './task-item-elements'
import { Badge } from '@the-planner/ui-web'

export const SearchedTask = ({ task }: { task: TaskWithProject }) => {
  return (
    <x.div
      data-testid="task-item-search"
      position="relative"
      p={2}
      pl={4}
      backgroundColor="layout-level1"
      borderRadius={2}
      h="fit-content"
    >
      <x.div
        position="absolute"
        top={2}
        left={2}
        w={4}
        h="calc(100% - 16px)"
        borderRadius={2}
        backgroundColor={task.project.color}
      />

      <x.span fontSize="xs">{task.project.title}</x.span>

      <Title isTaskCompleted={task.status === Status.COMPLETED}>
        {task.title}
      </Title>

      <x.div
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
      >
        <Details
          icon={<FiCalendar />}
          isTaskCompleted={task.status === Status.COMPLETED}
        >
          {formatDate(task.startDate)}
        </Details>
        <Badge status={task.status}>{statusAlias(task.status)}</Badge>
      </x.div>
    </x.div>
  )
}

export default SearchedTask
