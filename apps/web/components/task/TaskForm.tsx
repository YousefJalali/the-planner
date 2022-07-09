import ObjectID from 'bson-objectid'
import { useForm } from 'react-hook-form'
import _ from 'lodash'
import { parseISO } from 'date-fns'
import { useEffect, useMemo } from 'react'

import { Button, Form } from '@the-planner/ui-web'

import { TaskType, Status, TaskWithProjectType } from '@the-planner/types'
import { useYupValidationResolver } from '@the-planner/hooks'
import { addCurrentTime, addServerErrors, taskSchema } from '@the-planner/utils'
import {
  Title,
  Project,
  Description,
  Attachments,
  DateAndTime,
} from './task-form-inputs'

type Props = {
  id: 'create' | 'edit'
  title?: string
  defaultValues?: Partial<TaskType>
  onSubmit: (data: TaskType) => void
  isSubmitting?: boolean
  onRequestClose?: () => void
  serverErrors?: object
}

const stringToDate: (date: string | Date) => Date = (date) =>
  typeof date === 'string' ? parseISO(date) : date

export const initialDefaultValues: TaskType | TaskWithProjectType = {
  id: ObjectID().toHexString(),
  title: '',
  projectId: '',
  openTask: true,
  startDate: new Date(),
  endDate: null,
  startTime: null,
  endTime: null,
  description: '',
  attachments: [],
  status: Status.PROPOSED,
  createdAt: new Date(),
  updatedAt: new Date(),
}

function TaskForm({
  id,
  title,
  defaultValues = {},
  onSubmit,
  isSubmitting = false,
  onRequestClose,
  serverErrors,
}: Props) {
  const formName = 'task-form'

  let defValues = {
    ...initialDefaultValues,
    ...defaultValues,
  }

  defValues = {
    ...defValues,
    startDate: stringToDate(defValues.startDate),
    endDate: defValues.endDate && stringToDate(defValues.endDate),
    startTime: defValues.startTime && stringToDate(defValues.startTime),
    endTime: defValues.endTime && stringToDate(defValues.endTime),
  }

  const resolver = useYupValidationResolver<TaskType | TaskWithProjectType>(
    taskSchema
  )

  const methods = useForm<TaskType | TaskWithProjectType>({
    defaultValues: defValues,
    resolver,
  })

  const {
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors, isDirty },
    getValues,
    resetField,
    clearErrors,
    setValue,
  } = methods

  useEffect(() => {
    if (serverErrors) {
      addServerErrors(serverErrors, setError)
    }
    return () => {
      clearErrors()
    }
  }, [serverErrors])

  const onSubmitHandler = async (data: TaskType | TaskWithProjectType) => {
    const startDate = addCurrentTime(data.startDate)
    const endDate = data.endDate ? addCurrentTime(data.endDate) : null

    const formData = {
      ...data,
      startDate,
      endDate,
    }
    console.log(formData)
    // onSubmit(formData)
  }

  const dateErrors = useMemo(
    () => _.compact([_.get(errors, 'endDate'), _.get(errors, 'endTime')]),
    [errors]
  )

  useEffect(() => {
    if (getValues('openTask')) {
      resetField('endDate')
      resetField('startTime')
      resetField('endTime')
    }
  }, [getValues('openTask')])

  return (
    <>
      <Form
        id={id}
        name={formName}
        title={title}
        isSubmitting={isSubmitting}
        onRequestClose={onRequestClose}
        onSubmit={handleSubmit(onSubmitHandler)}
        isDirty={isDirty}
      >
        <Title control={control} formName={formName} />

        <Project control={control} formName={formName} setValue={setValue} />

        <DateAndTime
          control={control}
          formName={formName}
          watch={watch}
          getValues={getValues}
          errors={dateErrors}
        />

        <Description control={control} formName={formName} />

        <Attachments control={control} formName={formName} />

        <Button
          name="submit task"
          type="submit"
          position="sticky"
          zIndex={3}
          bottom={24}
          justifyContent="center"
          boxShadow={0}
          isLoading={isSubmitting}
          w="100%"
          size="large"
        >
          {id === 'edit' ? 'Update' : 'Create'}
        </Button>
      </Form>
    </>
  )
}

export default TaskForm
