import ObjectID from 'bson-objectid'

import {
  Button,
  Fieldset,
  Form,
  FormControl,
  ImageInput,
  Input,
  Label,
  SupportiveText,
  TextEditor,
} from '@the-planner/ui-web'

import {
  TaskType,
  Status,
  TaskWithProjectType,
  ImageType,
} from '@the-planner/types'

import { addCurrentTime, stringToDate, taskSchema } from '@the-planner/utils'
import SelectProject from '../../project/SelectProject'

import { DateTimeInput } from './date-input'

type Props = {
  id: 'create' | 'edit'
  defaultValues?: Partial<TaskType>
  onSubmit: (data: TaskType) => void
  isSubmitting?: boolean
  serverErrors?: object
}

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

export function TaskForm({
  id,
  defaultValues = {},
  onSubmit,
  isSubmitting = false,
  serverErrors,
}: Props) {
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

  const submitHandler = async (data: TaskType | TaskWithProjectType) => {
    const startDate = addCurrentTime(data.startDate)
    const endDate = data.endDate ? addCurrentTime(data.endDate) : null

    const formData = {
      ...data,
      startDate,
      endDate,
    }
    console.log(formData)
    onSubmit(formData)
  }

  return (
    <Form<TaskType | TaskWithProjectType>
      id={id}
      name="task-form"
      isSubmitting={isSubmitting}
      submitHandler={submitHandler}
      schema={taskSchema}
      defaultValues={defValues}
      serverErrors={serverErrors}
    >
      <FormControl<TaskType, string> name="title">
        {({ id, field: { value, onChange }, fieldStatus }) => {
          return (
            <Fieldset data-testid={id} label="title" fieldStatus={fieldStatus}>
              <Input
                id={id}
                value={value}
                onChange={onChange}
                type="text"
                placeholder="i.e. speakers"
              />
            </Fieldset>
          )
        }}
      </FormControl>

      <FormControl<TaskWithProjectType, string> name="projectId">
        {({
          id,
          field: { value, onChange },
          fieldStatus,
          methods: { setValue },
        }) => (
          <Fieldset data-testid={id} label="project" fieldStatus={fieldStatus}>
            <SelectProject
              id={id}
              value={value}
              onChange={onChange}
              taskProject={(project) => setValue('project', project)}
              placeholder="Select a project"
            />
          </Fieldset>
        )}
      </FormControl>

      <DateTimeInput />

      <FormControl<TaskType, string> name="description">
        {({ id, field: { value, onChange }, fieldStatus }) => (
          <Fieldset
            data-testid={id}
            label="description"
            fieldStatus={fieldStatus}
            optionalField
          >
            <TextEditor
              id={id}
              value={value}
              onChange={onChange}
              placeholder="A brief about the task..."
            />
          </Fieldset>
        )}
      </FormControl>

      <FormControl<TaskType, ImageType[]> name="attachments">
        {({ id, field: { value, onChange }, fieldStatus }) => (
          <fieldset data-testid={id}>
            <Label optional>attachments</Label>
            <ImageInput
              id={id}
              value={value}
              onChange={onChange}
              max={10}
              multiple
            />
            <SupportiveText>{`Photos • ${value.length}/10 `}</SupportiveText>
          </fieldset>
        )}
      </FormControl>

      <Button
        name="task-form"
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
  )
}

export default TaskForm
