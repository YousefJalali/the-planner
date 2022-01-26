import { FC } from 'react'
import { Box, Text } from '../../styles'
import { useForm, Controller } from 'react-hook-form'
import Input from '../formElements/Input'
import { TaskFormType } from '../../common/types/TaskFormType'
import Button from '../formElements/Button'
import DatePicker from '../formElements/DatePicker'
import taskSchema from '../../common/utils/validations/taskSchema'
import SelectProject from '../project/SelectProject'
import Form from '../../styles/FormStyle'
import TextEditor from '../formElements/TextEditor'
import SwitchButton from '../formElements/SwitchButton'
import ImageInput from '../formElements/ImageInput'
import Fieldset from '../formElements/Fieldset'

import { DevTool } from '@hookform/devtools'
import useYupValidationResolver from '../../common/utils/validations/useYupValidationResolver'

type Props = {
  onSubmit: () => void
  loading?: boolean
  // errors?: object
}

const CreateTask: FC<Props> = ({ onSubmit, loading }) => {
  const defaultValues = {
    title: '',
    project: '',
    isOpen: false,
    startDate: new Date().toString(),
    startTime: new Date().toString(),
    endDate: new Date().toString(),
    endTime: new Date().toString(),
    description: '',
    attachments: [],
  }

  const resolver = useYupValidationResolver<TaskFormType>(taskSchema)

  const {
    handleSubmit,
    control,
    clearErrors,
    watch,
    setError,
    formState: { errors },
  } = useForm<TaskFormType>({
    defaultValues,
    resolver,
  })

  console.log('errors: ', errors)
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

  const onSubmitHandler = (data: typeof defaultValues) => {
    // onSubmit(data)
    console.log(data)
  }

  return (
    <Box px={3} pb={3} backgroundColor='layout.level0'>
      {/* <DevTool control={control} placement='top-left' /> */}

      <Form onSubmit={handleSubmit(onSubmitHandler)} id='create-task-form'>
        <Controller
          name='title'
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Fieldset
                label='Task title'
                supportiveText='Enter a descriptive title Enter a descriptive title Enter a descriptive title'
                error={error}
              >
                <Input
                  type='text'
                  placeholder='i.e. speakers'
                  value={value}
                  onChange={onChange}
                  hasError={error !== undefined}
                />
              </Fieldset>
            )
          }}
        />

        <Controller
          name='project'
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Fieldset
                label='Project'
                supportiveText='Select a project or create one'
                error={error}
              >
                <SelectProject
                  value={value}
                  onChange={onChange}
                  placeholder='Select a project'
                />
              </Fieldset>
            )
          }}
        />

        <Box as='fieldset'>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            mb={0}
          >
            <Text as='span'>Start Date</Text>
            <Box display='flex' alignItems='center'>
              <Text as='span' mr={1}>
                Open task?
              </Text>

              <Controller
                name='isOpen'
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

          <Box display='flex' alignItems='flex-end'>
            <Box flex='0 0 60%'>
              <Controller
                name='startDate'
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Fieldset error={error}>
                      <DatePicker
                        selected={new Date(value)}
                        onChange={onChange}
                        popperPlacement='bottom-start'
                      />
                    </Fieldset>
                  )
                }}
              />
            </Box>

            <Box flex='0 0 calc(40% - 8px)' ml={1}>
              <Controller
                name='startTime'
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Fieldset error={error} disabled={watch('isOpen')}>
                      <DatePicker
                        selected={new Date(value)}
                        onChange={onChange}
                        disabled={watch('isOpen')}
                        popperPlacement='bottom-end'
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption='Time'
                        dateFormat='h:mm aa'
                      />
                    </Fieldset>
                  )
                }}
              />
            </Box>
          </Box>

          <Box display='flex' alignItems='flex-end' mt={2}>
            <Box flex='0 0 60%'>
              <Controller
                name='endDate'
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Fieldset
                      label='End'
                      disabled={watch('isOpen')}
                      error={error}
                    >
                      <DatePicker
                        selected={new Date(value)}
                        onChange={onChange}
                        disabled={watch('isOpen')}
                        popperPlacement='bottom-start'
                      />
                    </Fieldset>
                  )
                }}
              />
            </Box>

            <Box flex='0 0 calc(40% - 8px)' ml={1}>
              <Controller
                name='endTime'
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Fieldset disabled={watch('isOpen')} error={error}>
                      <DatePicker
                        selected={new Date(value)}
                        onChange={onChange}
                        disabled={watch('isOpen')}
                        popperPlacement='bottom-end'
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={30}
                        timeCaption='Time'
                        dateFormat='h:mm aa'
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
              <Fieldset label='description' error={error}>
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
                supportiveText={`Photos • ${value.length}/10`}
              >
                <ImageInput
                  value={value}
                  onChange={onChange}
                  max={1}
                  error={error}
                  multiple
                />
              </Fieldset>
            )
          }}
        />

        <Button type='submit' variant='primary' text='Create' />
      </Form>
    </Box>
  )
}

export default CreateTask
