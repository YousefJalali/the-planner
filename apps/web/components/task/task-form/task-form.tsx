import ObjectID from 'bson-objectid'
import { yupResolver } from '@hookform/resolvers/yup'

import { DateInput, ImageInput } from '../../ui'

import { Task, Status } from '@the-planner/types'

import {
  addCurrentTime,
  dateFormatPattern,
  stringToDate,
  taskFormValidation,
} from '@the-planner/utils'
import { SelectProject } from '../../project/select-project/'

import { Controller, useForm } from 'react-hook-form'

type Props = {
  id: 'create' | 'edit'
  defaultValues?: Partial<Task>
  onSubmit: (data: Task) => void
  isSubmitting?: boolean
  serverErrors?: object
}

export const initialDefaultValues = () =>
  ({
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
  } as Task)

export function TaskForm({
  id,
  defaultValues = {},
  onSubmit,
  isSubmitting = false,
  serverErrors,
}: Props) {
  let defValues = {
    ...initialDefaultValues(),
    ...defaultValues,
  }

  defValues = {
    ...defValues,
    startDate: stringToDate(defValues.startDate),
    endDate: defValues.endDate && stringToDate(defValues.endDate),
    startTime: defValues.startTime && stringToDate(defValues.startTime),
    endTime: defValues.endTime && stringToDate(defValues.endTime),
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset: resetForm,
    clearErrors,
    getValues,
    watch,
    setValue,
  } = useForm<Task>({
    defaultValues: defValues,
    resolver: yupResolver(taskFormValidation),
  })

  const submitHandler = async (data: Task) => {
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
    <>
      <form className="p-6 prose" onSubmit={handleSubmit(submitHandler)}>
        <h1 className="">{id === 'create' ? 'New' : 'Update'} Task</h1>

        <fieldset
          className="not-prose space-y-6"
          disabled={id === 'create' && isSubmitting}
        >
          <div className="form-control w-full">
            <label htmlFor="title" className="label">
              <span className="label-text">Title</span>
            </label>

            <input
              id="title"
              type="text"
              placeholder="Title..."
              className={`input-bordered input w-full ${
                errors?.title ? 'input-error' : ''
              }`}
              {...register('title')}
            />

            {errors?.title && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.title.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full">
            <label htmlFor="title" className="label">
              <span className="label-text">Project</span>
            </label>

            <Controller
              control={control}
              name="projectId"
              render={({ field: { onChange, value } }) => (
                <SelectProject
                  value={value}
                  onChange={onChange}
                  placeholder="Select a project"
                  className={`input-bordered input w-full ${
                    errors?.projectId ? 'input-error' : ''
                  }`}
                />
              )}
            />

            {errors?.projectId && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.projectId.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full">
            <label htmlFor="Description" className="label">
              <span className="label-text">Description</span>
            </label>

            <textarea
              id="description"
              placeholder="A brief about the task..."
              className="textarea-bordered textarea h-24"
              {...register('description')}
            ></textarea>

            {errors?.description && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.description.message}
                </span>
              </label>
            )}
          </div>

          <div className="divider"></div>

          <div className="form-control w-full">
            <label htmlFor="Date & Time" className="label">
              <span className="label-text">Date & Time</span>

              <div className="form-control">
                <label className="label cursor-pointer gap-2 p-0">
                  <span className="label-text">Open task?</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    {...register('openTask')}
                  />
                </label>
              </div>
            </label>

            <label htmlFor="From" className="label">
              <span className="label-text">From</span>
            </label>
            <div className="flex gap-4">
              <Controller
                control={control}
                name="startDate"
                render={({ field: { onChange, value } }) => (
                  <DateInput
                    dataTestId="task-form-start-date"
                    selected={value}
                    onChange={onChange}
                    placeholderText="Click to select a date"
                    selectsStart
                    startDate={value}
                    endDate={getValues('endDate')}
                    popperPlacement="bottom-start"
                    dateFormat={value ? dateFormatPattern(value) : undefined}
                    customInput={
                      <input
                        type="text"
                        className={`input-bordered input w-full ${
                          errors?.startDate ? 'input-error' : ''
                        }`}
                      />
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name="startTime"
                render={({ field: { onChange, value } }) => (
                  <DateInput
                    dataTestId="task-form-start-time"
                    selected={value}
                    onChange={onChange}
                    placeholderText="hh:mm"
                    disabled={watch('openTask')}
                    popperPlacement="bottom-end"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption=""
                    dateFormat="h:mm aa"
                    customInput={
                      <input
                        type="text"
                        className={`input-bordered input w-full ${
                          errors?.startTime ? 'input-error' : ''
                        }`}
                      />
                    }
                  />
                )}
              />
            </div>

            <label htmlFor="To" className="label">
              <span className="label-text">To (Optional)</span>
            </label>
            <div className="flex gap-4">
              <Controller
                control={control}
                name="endDate"
                render={({ field: { onChange, value } }) => (
                  <DateInput
                    dataTestId="task-form-end-date"
                    selected={value}
                    onChange={onChange}
                    placeholderText="Due date"
                    popperPlacement="bottom-start"
                    selectsEnd
                    startDate={getValues('startDate')}
                    endDate={value}
                    minDate={getValues('startDate')}
                    disabled={watch('openTask')}
                    dateFormat={value ? dateFormatPattern(value) : undefined}
                    customInput={
                      <input
                        type="text"
                        className={`input-bordered input w-full ${
                          errors?.endDate ? 'input-error' : ''
                        }`}
                      />
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name="endTime"
                render={({ field: { onChange, value } }) => (
                  <DateInput
                    dataTestId="task-form-end-time"
                    selected={value}
                    onChange={onChange}
                    placeholderText="hh:mm"
                    disabled={watch('openTask')}
                    popperPlacement="bottom-end"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption=""
                    dateFormat="h:mm aa"
                    customInput={
                      <input
                        type="text"
                        className={`input-bordered input w-full ${
                          errors?.endTime ? 'input-error' : ''
                        }`}
                      />
                    }
                  />
                )}
              />
            </div>

            <label className="label">
              <span className="label-text-alt">
                End date & end time are optional
              </span>
            </label>

            {errors?.startDate && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.startDate.message}
                </span>
              </label>
            )}
            {errors?.endDate && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.endDate.message}
                </span>
              </label>
            )}
            {errors?.startTime && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.startTime.message}
                </span>
              </label>
            )}
            {errors?.endTime && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.endTime.message}
                </span>
              </label>
            )}
          </div>

          <div className="divider"></div>

          <div className="form-control w-full">
            <label htmlFor="Attachments" className="label">
              <span className="label-text">Attachments</span>
            </label>

            <Controller
              control={control}
              name="attachments"
              render={({ field: { onChange, value } }) => (
                <>
                  <ImageInput
                    value={value}
                    onChange={onChange}
                    max={10}
                    multiple
                  />
                  <label htmlFor="title" className="label">
                    <span className="label-text">{`Photos • ${
                      value ? value.length : 0
                    }/10 `}</span>
                  </label>
                </>
              )}
            />

            {errors?.attachments && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.attachments.message}
                </span>
              </label>
            )}
          </div>

          <button
            name="task-form"
            type="submit"
            className={`sticky z-10 bottom-6 btn btn-primary w-full shadow-xl ${
              isSubmitting ? 'loading' : ''
            }`}
          >
            {id === 'edit' ? 'Update' : 'Create'} Task
          </button>
        </fieldset>
      </form>

      {/* <Form<Task | TaskWithProject>
        id={id}
        name="task-form"
        isSubmitting={isSubmitting}
        submitHandler={submitHandler}
        schema={taskFormValidation}
        defaultValues={defValues}
        serverErrors={serverErrors}
      >
        <FormControl<Task, string> name="title">
          {({ id, field: { value, onChange }, fieldStatus }) => {
            return (
              <Fieldset
                data-testid={id}
                label="title"
                fieldStatus={fieldStatus}
              >
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

        <FormControl<TaskWithProject, string> name="projectId">
          {({
            id,
            field: { value, onChange },
            fieldStatus,
            methods: { setValue },
          }) => (
            <Fieldset
              data-testid={id}
              label="project"
              fieldStatus={fieldStatus}
            >
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

        <FormControl<Task, string> name="description">
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

        <FormControl<Task, Attachment[]> name="attachments">
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
      </Form> */}
    </>
  )
}

export default TaskForm
