import { FC } from 'react'
import { useForm, Controller } from 'react-hook-form'
import _ from 'lodash'

import { Box, Text } from '../../styles'

import Input from '../formElements/Input'
import DatePicker from '../formElements/DatePicker'
import SelectProject from '../project/SelectProject'
import TextEditor from '../formElements/TextEditor'
import SwitchButton from '../formElements/SwitchButton'
import ImageInput from '../formElements/ImageInput'
import Fieldset from '../formElements/Fieldset'

import taskSchema from '../../common/utils/validations/taskSchema'
import useYupValidationResolver from '../../common/utils/validations/useYupValidationResolver'

import { TaskType } from '../../common/types/TaskType'
import styled from 'styled-components'

// type TaskFormType = Omit<TaskType, 'id' | 'completed'>

const Form = styled.form`
  > fieldset {
    &:not(:last-child) {
      margin-bottom: ${({ theme }) => theme.space[3]}px;
    }
  }

  > input[type='submit'] {
    visibility: hidden;
    height: 0;
    padding: 0;
  }
`

type Props<T> = {
  // errors?: object
  id: string
  defaultValues: T
  onSubmit: (data: TaskType) => Promise<void>
}

function TaskForm<T>(props: Props<T>) {
  const { id, defaultValues, onSubmit } = props

  const resolver = useYupValidationResolver<TaskType>(taskSchema)

  const {
    handleSubmit,
    control,
    clearErrors,
    watch,
    setError,
    formState: { errors },
  } = useForm<TaskType>({
    defaultValues,
    resolver,
  })

  //API errors
  // useEffect(() => {
  //   if (!_.isEmpty(errors)) {
  //     for (let error of errors) {
  //       setError(error.field, {
  //         type: 'manual',
  //         message: error.message,
  //       })
  //     }
  //   }
  // }, [errors])

  console.log('form errors ', errors)

  const onSubmitHandler = async (data: TaskType) => {
    console.log('form submitted')

    onSubmit(data)
  }

  // const filterPassedTime = (time: Date | null) => {
  //   console.log(time)
  //   if (time instanceof Date) {
  //     console.log('ha')
  //     const currentDate = new Date()
  //     const selectedDate = new Date(time)

  //     return currentDate.getTime() < selectedDate.getTime()
  //   }

  //   return false
  // }

  // console.log()

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      {/* Title */}
      <Controller
        name='title'
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Fieldset label='Task title' error={error}>
              <Input
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
          return (
            <Fieldset label='Project' error={error}>
              <SelectProject
                value={value as string}
                onChange={onChange}
                placeholder='Select a project'
              />
            </Fieldset>
          )
        }}
      />

      {/* Date */}

      <Box as='fieldset'>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={0}
        >
          <Text as='span'>From</Text>
          <Box display='flex' alignItems='center'>
            <Text as='span' mr={1}>
              Open task?
            </Text>

            <Controller
              name='openTask'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <SwitchButton
                    height={20}
                    checked={value}
                    onChange={onChange}
                  />
                )
              }}
            />
          </Box>
        </Box>

        {/* Start Date */}
        <Box display='flex' alignItems='flex-end'>
          <Box flex='0 0 calc(100% - 8px - 85px)'>
            <Controller
              name='date'
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <Fieldset error={error}>
                    <DatePicker
                      selectsStart
                      selected={value.startDate}
                      onChange={(v) => onChange({ ...value, startDate: v })}
                      startDate={value.startDate}
                      endDate={value.endDate}
                      popperPlacement='bottom-start'
                      placeholderText='Click to select a date'
                    />
                  </Fieldset>
                )
              }}
            />
          </Box>

          {/* Start Time */}
          <Box width={85} ml={1}>
            <Controller
              name='time'
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <Fieldset error={error} disabled={watch('openTask')}>
                    <DatePicker
                      selected={value.startTime}
                      onChange={(v) => onChange({ ...value, startTime: v })}
                      disabled={watch('openTask')}
                      popperPlacement='bottom-end'
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption=''
                      dateFormat='h:mm aa'
                      placeholderText='HH:MM'
                    />
                  </Fieldset>
                )
              }}
            />
          </Box>
        </Box>

        {/* End Date */}
        <Box display='flex' alignItems='flex-end' mt={2}>
          <Box flex='0 0 calc(100% - 8px - 85px)'>
            <Controller
              name='date'
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <Fieldset
                    label='End'
                    disabled={watch('openTask')}
                    error={error}
                  >
                    <DatePicker
                      selectsEnd
                      selected={value.endDate}
                      onChange={(v) => onChange({ ...value, endDate: v })}
                      startDate={value.startDate}
                      endDate={value.endDate}
                      minDate={value.startDate}
                      disabled={watch('openTask')}
                      popperPlacement='bottom-start'
                      placeholderText='MM/DD/YYYY'
                    />
                  </Fieldset>
                )
              }}
            />
          </Box>

          {/* End Time */}
          <Box width={85} ml={1}>
            <Controller
              name='time'
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <Fieldset disabled={watch('openTask')} error={error}>
                    <DatePicker
                      selected={value.endTime}
                      onChange={(v) => onChange({ ...value, endTime: v })}
                      disabled={watch('openTask')}
                      popperPlacement='bottom-end'
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption=''
                      dateFormat='h:mm aa'
                      placeholderText='HH:MM'
                    />
                  </Fieldset>
                )
              }}
            />
          </Box>
        </Box>
      </Box>

      <Controller
        name='description'
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Fieldset label='description' error={error} optionalField>
              <TextEditor
                value={value}
                onChange={onChange}
                placeholder='write something'
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
              <ImageInput value={value} onChange={onChange} max={10} multiple />
            </Fieldset>
          )
        }}
      />

      <input type='submit' id={id} />
    </Form>
  )
}

export default TaskForm
