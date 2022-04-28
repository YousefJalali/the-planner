import { x } from '@xstyled/styled-components'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import { useModal } from '../../common/contexts/ModalCtx'
import useFetchedTaskById from '../../common/data/useFetchedTaskById'
import useCreateTask from '../../common/hooks/task/useCreateTask'
import Icon from '../../components/Icon'
import Header from '../../components/layout/Header'
import TaskDetails from '../../components/task/TaskDetails'
import TaskForm from '../../components/task/TaskForm'

const TaskDetailsPage = () => {
  const { setModal, clearModal } = useModal()

  const router = useRouter()

  const { task, error } = useFetchedTaskById(router.query.taskId as string)

  const { onSubmit, isSubmitting } = useCreateTask(() =>
    clearModal('task-edit')
  )

  const editTaskHandler = () => {
    if (task) {
      setModal({
        id: 'task-edit',
        fullScreen: true,
        content: (
          <TaskForm
            id='edit'
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            defaultValues={task}
          />
        ),
      })
    }
  }

  return (
    <>
      <main>
        <Header>
          <x.a onClick={() => router.back()}>
            <Icon icon={FiArrowLeft} size='1.5rem' />
          </x.a>

          <x.a textDecoration='underline' onClick={editTaskHandler}>
            Edit
          </x.a>
        </Header>

        {task && <TaskDetails task={task} />}
        <x.section overflow='hidden' px={4}></x.section>
      </main>
    </>
  )
}

export default TaskDetailsPage
