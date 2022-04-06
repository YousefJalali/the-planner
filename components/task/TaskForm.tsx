import { x } from '@xstyled/styled-components'
import {
  useForm,
  Controller,
  UseFormSetError,
  FieldErrors,
  FieldError,
} from 'react-hook-form'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import Input from '../formElements/Input'
import DatePicker from '../formElements/DatePicker'
import SelectProject from '../project/SelectProject'
import TextEditor from '../formElements/TextEditor'
import SwitchButton from '../formElements/SwitchButton'
import ImageInput from '../formElements/ImageInput'
import Fieldset from '../formElements/Fieldset'

import taskSchema from '../../common/utils/validations/taskSchema'
import useYupValidationResolver from '../../common/utils/validations/useYupValidationResolver'

import { Status, TaskProjectType, TaskType } from '../../common/types/TaskType'
import { parseISO } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  id: string
  defaultValues?: Partial<TaskType>
  validationError?: null | FieldErrors
  onSubmit: (
    data: TaskType,
    setError: UseFormSetError<TaskType>
    // clearErrors: UseFormClearErrors<TaskType>
  ) => void
}

export const addServerErrors = (
  errors: FieldErrors,
  setError: UseFormSetError<TaskType>
) => {
  for (const [key, value] of Object.entries(errors)) {
    setError(key as keyof TaskType, {
      type: 'manual',
      message: (value as FieldError).message,
    })
  }
}

const stringToDate: (date: string | Date) => Date = (date) =>
  typeof date === 'string' ? parseISO(date) : date

export const initialDefaultValues: TaskType = {
  id: uuidv4(),
  title: '',
  project: '',
  openTask: true,
  date: { startDate: new Date(), endDate: null },
  time: { startTime: null, endTime: null },
  description: '',
  attachments: [],
  status: Status.PROPOSED,
}

function TaskForm({ id, defaultValues = {}, onSubmit }: Props) {
  console.log('form rendered')

  let defValues = {
    ...initialDefaultValues,
    ...defaultValues,
  }

  defValues = {
    ...defValues,
    project:
      typeof defValues.project !== 'string'
        ? (defValues.project as TaskProjectType).id
        : defValues.project,
    date: {
      startDate: stringToDate(defValues.date.startDate),
      endDate: defValues.date.endDate && stringToDate(defValues.date.endDate),
    },
    time: {
      startTime:
        defValues.time.startTime && stringToDate(defValues.time.startTime),
      endTime: defValues.time.endTime && stringToDate(defValues.time.endTime),
    },
  }

  const resolver = useYupValidationResolver<TaskType>(taskSchema)
  const {
    handleSubmit,
    control,
    clearErrors,
    watch,
    setError,
    formState: { errors },
    setValue,
    getValues,
    reset,
    resetField,
  } = useForm<TaskType>({
    defaultValues: defValues,
    resolver,
  })

  const onSubmitHandler = async (data: TaskType) => {
    onSubmit(data, setError)
  }

  const dateErrors = useMemo(
    () =>
      [_.get(errors, 'date.endDate'), _.get(errors, 'time.endTime')].filter(
        (x) => !!x
      ),
    [errors]
  )

  const onOpenTaskHandler = (checked: boolean) => {
    if (checked) {
      resetField('date.endDate')
      resetField('time.startTime')
      resetField('time.endTime')
    }
  }

  return (
    <x.form id={id} spaceY={5} onSubmit={handleSubmit(onSubmitHandler)}>
      {/* Title */}
      <Controller
        name='title'
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Fieldset id='task-form-title' label='Task title' error={error}>
              <Input
                id='task-form-title'
                type='text'
                placeholder='i.e. speakers'
                value={value}
                onChange={onChange}
              />
            </Fieldset>
          )
        }}
      />

      {/* Project */}
      <Controller
        name='project'
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          const v = _.isObject(value) ? value.id : value

          return (
            <Fieldset id='task-form-project' label='Project' error={error}>
              <SelectProject
                id='task-form-project'
                value={v}
                onChange={onChange}
                placeholder='Select a project'
              />
            </Fieldset>
          )
        }}
      />

      {/* Date */}
      <Fieldset
        noBorder
        error={dateErrors}
        supportiveText='End date & end time are optional'
      >
        <>
          <x.div
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mb={1}
          >
            <x.span>Date & Time</x.span>
            <x.div display='flex' alignItems='center'>
              <x.span mr={2}>Open task?</x.span>

              <Controller
                name='openTask'
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <SwitchButton
                      id='task-form-openTask'
                      height={20}
                      checked={value}
                      onChange={(e) => {
                        onChange(e.target.checked)
                        onOpenTaskHandler(e.target.checked)
                      }}
                    />
                  )
                }}
              />
            </x.div>
          </x.div>

          {/* Start Date */}
          <x.div display='flex'>
            <x.div flex='0 0 calc(100% - 8px - 85px)'>
              <Controller
                name='date.startDate'
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Fieldset
                      id='task-form-startDate'
                      error={error}
                      noErrorMessage
                      label='from'
                    >
                      <DatePicker
                        id='task-form-startDate'
                        dataTestId='task-form-start-date'
                        selectsStart
                        selected={value}
                        onChange={onChange}
                        startDate={value}
                        endDate={getValues('date.endDate')}
                        popperPlacement='bottom-start'
                        placeholderText='Click to select a date'
                        dateFormat='PPPP'
                      />
                    </Fieldset>
                  )
                }}
              />
            </x.div>

            {/* Start Time */}
            <x.div w={85} ml={2} mt='calc((0.889rem * 1.5) + 0.25rem)'>
              <Controller
                name='time.startTime'
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Fieldset
                      id='task-form-startTime'
                      error={error}
                      noErrorMessage
                      disabled={watch('openTask')}
                    >
                      <DatePicker
                        id='task-form-startTime'
                        dataTestId='task-form-start-time'
                        selected={value}
                        onChange={onChange}
                        disabled={watch('openTask')}
                        popperPlacement='bottom-end'
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption=''
                        dateFormat='h:mm aa'
                        placeholderText='hh:mm'
                      />
                    </Fieldset>
                  )
                }}
              />
            </x.div>
          </x.div>

          {/* End Date */}
          <x.div display='flex' mt={3}>
            <x.div flex='0 0 calc(100% - 8px - 85px)'>
              <Controller
                name='date.endDate'
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Fieldset
                      id='task-form-endDate'
                      label='To'
                      disabled={watch('openTask')}
                      error={error}
                      noErrorMessage
                      optionalField
                    >
                      <DatePicker
                        id='task-form-endDate'
                        dataTestId='task-form-end-date'
                        selectsEnd
                        selected={value}
                        onChange={onChange}
                        startDate={getValues('date.startDate')}
                        endDate={value}
                        minDate={getValues('date.startDate')}
                        disabled={watch('openTask')}
                        popperPlacement='bottom-start'
                        placeholderText='Due date'
                      />
                    </Fieldset>
                  )
                }}
              />
            </x.div>

            {/* End Time */}
            <x.div w={85} ml={2} mt='calc((0.889rem * 1.5) + 0.25rem)'>
              <Controller
                name='time.endTime'
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Fieldset
                      id='task-form-endTime'
                      disabled={watch('openTask')}
                      error={error}
                      noErrorMessage
                    >
                      <DatePicker
                        id='task-form-endTime'
                        dataTestId='task-form-end-time'
                        selected={value}
                        onChange={onChange}
                        disabled={watch('openTask')}
                        popperPlacement='bottom-end'
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption=''
                        dateFormat='h:mm aa'
                        placeholderText='hh:mm'
                      />
                    </Fieldset>
                  )
                }}
              />
            </x.div>
          </x.div>
        </>
      </Fieldset>

      <Controller
        name='description'
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Fieldset
              // id='task-form-description'
              label='description'
              error={error}
              optionalField
            >
              <TextEditor
                id='description'
                value={value}
                onChange={onChange}
                placeholder='A brief about the task...'
              />
            </Fieldset>
          )
        }}
      />

      <Controller
        name='attachments'
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Fieldset
              label='attachments'
              error={error}
              supportiveText={`Photos • ${value.length}/10 `}
              noBorder
              optionalField
            >
              <ImageInput
                id='task-form-attachments'
                value={value}
                onChange={onChange}
                max={10}
                multiple
              />
            </Fieldset>
          )
        }}
      />

      <x.input
        type='submit'
        id={`${id}-submit`}
        visibility='hidden'
        h={0}
        p={0}
      />
    </x.form>
  )
}

export default TaskForm
