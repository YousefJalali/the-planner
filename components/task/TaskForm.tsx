import { FC } from 'react'
import { Box, Text } from '../../styles'
import { useForm, Controller } from 'react-hook-form'
import Input from '../formElements/Input'
import { TaskFormType } from '../../common/types/TaskFormType'
import Button from '../formElements/Button'
import DatePicker from '../formElements/DatePicker'
import validationClient from '../../common/utils/validations/validationClient'
import taskSchema from '../../common/utils/validations/taskSchema'
import SelectProject from '../project/SelectProject'
import Form from '../../styles/FormStyle'
import TextEditor from '../formElements/TextEditor'
import SwitchButton from '../formElements/SwitchButton'
import ImageInput from '../formElements/ImageInput'
import Fieldset from '../formElements/Fieldset'

import { DevTool } from '@hookform/devtools'

type Props = {
  onSubmit: () => void
  loading?: boolean
  errors?: object
}

const CreateTask: FC<Props> = ({ onSubmit, loading, errors }) => {
  const defaultValues = {
    title: '',
    project: {
      id: '',
      title: '',
      color: '',
    },
    isOpen: false,
    startDate: new Date().toString(),
    startTime: new Date().toString(),
    endDate: new Date().toString(),
    endTime: new Date().toString(),
    description: '',
    attachments: [],
  }

  const { handleSubmit, control, setError, watch, clearErrors } =
    useForm<TaskFormType>({
      defaultValues,
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

  const onSubmitHandler = async (data: typeof defaultValues) => {
    const { success, errors } = await validationClient(taskSchema, data)

    if (!success) {
      for (let error of errors) {
        setError(error.field, {
          type: 'manual',
          message: error.message,
        })
      }
      return
    }

    // onSubmit(data)
    console.log(data)
  }

  return (
    <Box px={3} pb={3} backgroundColor='layout.level0'>
      {/* <DevTool control={control} placement='top-left' /> */}
      <Form onSubmit={handleSubmit(onSubmitHandler)} id='create-task-form'>
        <Fieldset<TaskFormType>
          name='title'
          label='Task title'
          supportiveText='Enter a descriptive title Enter a descriptive title Enter a descriptive title'
          control={control}
        >
          <Input type='text' placeholder='i.e. speakers' />
        </Fieldset>

        {/* <Input<TaskFormType>
          name='title'
          type='text'
          placeholder='i.e. speakers'
          label='Task title'
          supportiveText='Enter a descriptive title Enter a descriptive title Enter a descriptive title'
          control={control}
        /> */}

        <SelectProject<TaskFormType> name='project' control={control} />

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
              <SwitchButton<TaskFormType>
                name='isOpen'
                height={20}
                control={control}
              />
            </Box>
          </Box>

          <Box display='flex' alignItems='flex-end'>
            <Box flex='0 0 60%'>
              <DatePicker<TaskFormType>
                name='startDate'
                control={control}
                popperPlacement='bottom-start'
              />
            </Box>

            <Box flex='0 0 calc(40% - 8px)' ml={1}>
              <DatePicker<TaskFormType>
                name='startTime'
                // label='Start time'
                control={control}
                disabled={watch('isOpen')}
                popperPlacement='bottom-end'
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption='Time'
                dateFormat='h:mm aa'
              />
            </Box>
          </Box>

          <Box display='flex' alignItems='flex-end' mt={2}>
            <Box flex='0 0 60%'>
              <DatePicker<TaskFormType>
                name='endDate'
                label='End'
                control={control}
                disabled={watch('isOpen')}
                popperPlacement='bottom-start'
              />
            </Box>

            <Box flex='0 0 calc(40% - 8px)' ml={1}>
              <DatePicker<TaskFormType>
                name='endTime'
                // label='End time'
                control={control}
                disabled={watch('isOpen')}
                popperPlacement='bottom-end'
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption='Time'
                dateFormat='h:mm aa'
              />
            </Box>
          </Box>
        </Box>

        <TextEditor<TaskFormType> name='description' control={control} />

        {/* <ImageInput<TaskFormType>
          name='attachments'
          max={10}
          control={control}
          multiple
        /> */}

        <Controller
          name='attachments'
          control={control}
          // defaultValue={photo}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <ImageInput
                value={value}
                onChange={(e) => {
                  if (error) clearErrors('attachments')
                  onChange(e)
                }}
                max={1}
                error={error}
                // setError={setError}
                disabled={loading}
                multiple
              />
            )
          }}
        />

        <Button type='submit' variant='primary' text='Create' />
      </Form>
    </Box>
  )
}

export default CreateTask
