import { x } from '@xstyled/styled-components'
import { useForm, Controller } from 'react-hook-form'
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

import { Status, TaskType } from '../../common/types/TaskType'
import { parseISO } from 'date-fns'

type Props<T> = {
  // errors?: object
  id: string
  defaultValues?: TaskType
  onSubmit: (data: TaskType) => void
}

const initialDefaultValues: TaskType = {
  id: uuidv4(),
  title: '',
  project: '',
  openTask: false,
  date: { startDate: new Date(), endDate: null },
  time: { startTime: null, endTime: null },
  description: '',
  attachments: [],
  status: Status.PROPOSED,
}

function TaskForm<T>({
  id,
  defaultValues = initialDefaultValues,
  onSubmit,
}: Props<T>) {
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

  if (typeof defaultValues.project !== 'string') {
    defaultValues.project = defaultValues.project.id
  }

  if (typeof defaultValues.date.startDate === 'string') {
    defaultValues.date.startDate = parseISO(defaultValues.date.startDate)
  }
  if (typeof defaultValues.date.endDate === 'string') {
    defaultValues.date.endDate = parseISO(defaultValues.date.endDate)
  }
  if (typeof defaultValues.time.startTime === 'string') {
    defaultValues.time.startTime = parseISO(defaultValues.time.startTime)
  }
  if (typeof defaultValues.time.endTime === 'string') {
    defaultValues.time.endTime = parseISO(defaultValues.time.endTime)
  }

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

  const onSubmitHandler = async (data: TaskType) => onSubmit(data)

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
    <x.form spaceY={4} onSubmit={handleSubmit(onSubmitHandler)}>
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
          const v = _.isObject(value) ? value.id : value

          return (
            <Fieldset label='Project' error={error}>
              <SelectProject
                value={v}
                onChange={onChange}
                placeholder='Select a project'
              />
            </Fieldset>
          )
        }}
      />

      {/* Date */}

      <x.fieldset>
        <x.div
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={1}
        >
          <x.span>From</x.span>
          <x.div display='flex' alignItems='center'>
            <x.span mr={2}>Open task?</x.span>

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
          </x.div>
        </x.div>

        {/* Start Date */}
        <x.div display='flex' alignItems='flex-end'>
          <x.div flex='0 0 calc(100% - 8px - 85px)'>
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
          </x.div>

          {/* Start Time */}
          <x.div w={85} ml={2}>
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
          </x.div>
        </x.div>

        {/* End Date */}
        <x.div display='flex' alignItems='flex-end' mt={3}>
          <x.div flex='0 0 calc(100% - 8px - 85px)'>
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
          </x.div>

          {/* End Time */}
          <x.div w={85} ml={2}>
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
          </x.div>
        </x.div>
      </x.fieldset>

      <Controller
        name='description'
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Fieldset label='description' error={error} optionalField>
              <TextEditor
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
              <ImageInput value={value} onChange={onChange} max={10} multiple />
            </Fieldset>
          )
        }}
      />

      <x.input type='submit' id={id} visibility='hidden' h={0} p={0} />
    </x.form>
  )
}

export default TaskForm
