import { x } from '@xstyled/styled-components'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import useFetchedTaskById from '../../common/data/useFetchedTaskById'
import Header from '../../components/layout/Header'
import TaskDetails from '../../components/task/TaskDetails'
import TaskOptions from '../../components/task/TaskOptions'

const TaskDetailsPage = () => {
  const router = useRouter()

  const { task, error } = useFetchedTaskById(router.query.taskId as string)

  if (!task) return <div>no task</div>

  return (
    <main>
      <Header pageTitle={task ? task.title : ''}>
        <x.a
          onClick={() => router.back()}
          h='3rem'
          w='3rem'
          fontSize='1.5rem'
          display='flex'
          // justifyContent='center'
          alignItems='center'
        >
          <FiArrowLeft />
        </x.a>

        <TaskOptions task={task} callLocation='taskId' iconSize='1.5rem' />
      </Header>

      {task && <TaskDetails task={task} showTag />}
      <x.section overflow='hidden' px={4}></x.section>
    </main>
  )
}

export default TaskDetailsPage
