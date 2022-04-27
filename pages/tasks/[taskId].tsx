import { x } from '@xstyled/styled-components'
import { useRouter } from 'next/router'
import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import useFetchedTaskById from '../../common/data/useFetchedTaskById'
import useToggle from '../../common/hooks/useToggle'
import Icon from '../../components/Icon'
import Header from '../../components/layout/Header'
import EditTaskModal from '../../components/modals/EditTaskModal'
import TaskDetails from '../../components/task/TaskDetails'

const TaskDetailsPage = () => {
  const [editTaskModal, setEditTaskModal] = useToggle(false)

  const router = useRouter()

  const { task, error } = useFetchedTaskById(router.query.taskId as string)

  return (
    <>
      <main>
        <Header>
          <x.a onClick={() => router.back()}>
            <Icon icon={FiArrowLeft} size='1.5rem' />
          </x.a>

          <x.a textDecoration='underline' onClick={setEditTaskModal}>
            Edit
          </x.a>
        </Header>

        {task && (
          <>
            <TaskDetails task={task} />

            <EditTaskModal
              isOpen={editTaskModal}
              onRequestClose={setEditTaskModal}
              task={task}
            />
          </>
        )}
        <x.section overflow='hidden' px={4}></x.section>
      </main>
    </>
  )
}

export default TaskDetailsPage
