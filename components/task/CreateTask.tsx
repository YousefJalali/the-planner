import { useRouter } from 'next/router'
import { FC, useContext, useState } from 'react'
import { UseFormClearErrors, UseFormSetError } from 'react-hook-form'
import { createTask } from '../../common/actions/taskActions'
import NotificationCtx from '../../common/contexts/NotificationCtx'
import { addTaskToLocalProjectData } from '../../common/data/localData/localProjectsData'
import { addTaskToLocalTasksData } from '../../common/data/localData/localTasksData'
import useFetchedDateTasks from '../../common/data/useFetchedDateTasks'
import useFetchedProjectById from '../../common/data/useFetchedProjectById'
import { ProjectType } from '../../common/types/ProjectType'
import { TaskType } from '../../common/types/TaskType'
import FormWithHeader from '../FormWithHeader'
import TaskForm, { addServerErrors } from './TaskForm'

type Props = {
  onRequestClose: (action?: any) => void
  date?: string
  projectId?: string
  defaultValues?: Partial<TaskType>
}

const CreateTask: FC<Props> = ({ onRequestClose, date, defaultValues }) => {
  console.log('CreateTask rendered')
  const { setNotification } = useContext(NotificationCtx)

  const router = useRouter()

  const { setProject } = useFetchedProjectById(router.query.projectId as string)
  const { setDateTasks } = useFetchedDateTasks(
    date ? date : new Date().toDateString(),
    'CreateTask'
  )

  let defValues = { ...defaultValues }
  if (router.query.projectId) {
    defValues = {
      ...defaultValues,
      project: router.query.projectId as string,
    }
  }
  if (router.query.d) {
    defValues = {
      ...defaultValues,
      date: {
        startDate: new Date((router.query.d as string).replaceAll('-', ' ')),
        endDate: null,
      },
    }
  }

  const createTaskHandler = async (
    formData: TaskType,
    setError: UseFormSetError<TaskType>
  ) => {
    //update data locally
    setDateTasks(
      (data) => data && addTaskToLocalTasksData(data, formData),
      false
    )
    setProject((data) => data && addTaskToLocalProjectData(data, formData))

    const { data, error, validationErrors } = await createTask(formData)

    if (validationErrors) {
      addServerErrors(validationErrors, setError)
    } else {
      onRequestClose()

      //mutate with validation
      setDateTasks()
      setProject()

      if (data) {
        setNotification({
          message: 'Task created successfully',
          variant: 'confirmation',
        })
      }

      if (error) {
        setNotification({
          message: error,
          variant: 'critical',
        })
      }
    }
  }

  return (
    <FormWithHeader
      title='Create task'
      onClose={onRequestClose}
      id='create-task-form'
    >
      <TaskForm
        id='create-task-form'
        onSubmit={createTaskHandler}
        defaultValues={defValues}
      />
    </FormWithHeader>
  )
}

export default CreateTask
