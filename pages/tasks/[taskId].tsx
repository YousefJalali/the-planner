import { x } from '@xstyled/styled-components'
import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import { useModal } from '../../common/contexts/ModalCtx'
import useTask from '../../common/data/useTask'
import useUpdateTaskStatus from '../../common/hooks/task/useUpdateTaskStatus'
import Button from '../../components/formElements/Button'
import Header from '../../components/layout/Header'
import Spinner from '../../components/Spinner'
import TaskDetails from '../../components/task/TaskDetails'
import TaskOptions from '../../components/task/TaskOptions'

const TaskDetailsPage = () => {
  const router = useRouter()
  const { setModal, clearModal } = useModal()

  const { task, error, isLoading } = useTask(router.query.taskId as string)

  // const { taskStatusHandler } = useUpdateTaskStatus(
  //   null,
  //   null,
  //   () => {
  //     clearModal('task-status')
  //     clearModal('task-options')
  //   }
  // )

  return (
    <main>
      <Header pageTitle={task ? task.title : ''}>
        <Button
          name='back'
          variant='outline'
          onClick={() => router.back()}
          ml={4}
          borderColor='layout-level0accent'
          borderRadius='full'
          p={1}
        >
          <x.span fontSize='1.5rem' color='content-contrast'>
            <FiArrowLeft />
          </x.span>
        </Button>

        {/* {task ? <TaskOptions onChangeStatus={() => taskStatusHandler()} inHeader /> : <div />} */}
      </Header>

      {isLoading ? (
        <x.div px={4} display='flex' justifyContent='center'>
          <Spinner pathColor='brand-primary' />
        </x.div>
      ) : error ? (
        <x.div px={4} display='flex' justifyContent='center'>
          {error}
        </x.div>
      ) : (
        task && <TaskDetails task={task} showTag />
      )}
    </main>
  )
}

export default TaskDetailsPage
