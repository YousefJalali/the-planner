import { x } from '@xstyled/styled-components'
import { subDays } from 'date-fns'
import { FiCalendar } from 'react-icons/fi'
import { Status, TaskWithProjectType } from '../../common/types/TaskType'
import { formatDate } from '../../common/utils/dateHelpers'
import Tag from './Tag'
import { Details, TaskTitle } from './TaskItem'

const SearchedTask = ({ task }: { task: TaskWithProjectType }) => {
  return (
    <x.div
      data-testid='task-search'
      position='relative'
      p={2}
      pl={4}
      backgroundColor='layout-level1'
      borderRadius={2}
      h='fit-content'
    >
      <x.div
        position='absolute'
        top={2}
        left={2}
        w={4}
        h='calc(100% - 16px)'
        borderRadius={2}
        backgroundColor={task.project.color}
      />

      <x.span fontSize='xs'>{task.project.title}</x.span>

      <TaskTitle isTaskCompleted={task.status === Status.COMPLETED}>
        {task.title}
      </TaskTitle>

      <x.div
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mt={1}
      >
        <Details
          icon={<FiCalendar />}
          isTaskCompleted={task.status === Status.COMPLETED}
        >
          {formatDate(task.startDate)}
        </Details>
        <Tag variant={task.status} />
      </x.div>
    </x.div>
  )
}

export default SearchedTask
