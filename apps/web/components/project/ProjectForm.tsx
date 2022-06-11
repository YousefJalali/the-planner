import { x } from '@xstyled/styled-components'
import { useForm, Controller } from 'react-hook-form'
import ObjectID from 'bson-objectid'

import Input from '../formElements/Input'
import TextEditor from '../formElements/TextEditor'
import Fieldset from '../formElements/Fieldset'

import useYupValidationResolver from '../../common/hooks/useYupValidationResolver'

import { ProjectType } from '../../common/types/ProjectType'
import ColorInput from '../formElements/ColorInput'
import Button from '../formElements/Button'
import Form from '../form/Form'
import projectSchema from '../../common/utils/validations/projectSchema'
import { useEffect } from 'react'
import addServerErrors from '../../common/utils/addServerErrors'

type Props<T> = {
  id: 'edit' | 'create'
  title?: string
  defaultValues?: Partial<ProjectType>
  onSubmit: (data: ProjectType) => void
  isSubmitting?: boolean
  onRequestClose?: () => void
  onDelete?: () => void
  serverErrors?: object
}

const initialDefaultValues: ProjectType = {
  id: ObjectID().toHexString(),
  title: '',
  description: '',
  color: '#cccccc',
  isHidden: false,
  updatedAt: new Date(),
  createdAt: new Date(),
}

function ProjectForm<T>({
  id,
  title,
  defaultValues = initialDefaultValues,
  onSubmit,
  isSubmitting,
  onRequestClose,
  onDelete,
  serverErrors,
}: Props<T>) {
  const formName = 'project-form'

  const resolver = useYupValidationResolver<ProjectType>(projectSchema)

  const {
    handleSubmit,
    control,
    setError,
    formState: { isDirty, errors },
    clearErrors,
  } = useForm<ProjectType>({
    defaultValues: {
      ...initialDefaultValues,
      ...defaultValues,
    },
    resolver,
  })

  useEffect(() => {
    if (serverErrors) {
      addServerErrors(serverErrors, setError)
    }
    return () => {
      clearErrors()
    }
  }, [serverErrors])

  const onSubmitHandler = async (data: ProjectType) => {
    onSubmit(data)
  }

  return (
    <Form
      id={id}
      name={formName}
      title={title}
      onRequestClose={onRequestClose}
      onSubmit={handleSubmit(onSubmitHandler)}
      isSubmitting={isSubmitting}
      isDirty={isDirty}
    >
      <Fieldset
        noBorder
        supportiveText='select a color so it will be easy for you to organize your projects'
      >
        <x.div display='flex' spaceX={2}>
          {/* Title */}
          <Controller
            name='title'
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Fieldset
                  id={`${formName}-title`}
                  label='Project title'
                  error={error}
                >
                  <Input
                    id={`${formName}-title`}
                    type='text'
                    placeholder='i.e. speakers'
                    value={value}
                    onChange={onChange}
                  />
                </Fieldset>
              )
            }}
          />

          <Controller
            name='color'
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <x.div flex='1'>
                  <Fieldset
                    id={`${formName}-color`}
                    label='color'
                    showLabel={false}
                    error={error}
                    width='fit'
                  >
                    <ColorInput value={value} onChange={onChange} />
                  </Fieldset>
                </x.div>
              )
            }}
          />
        </x.div>
      </Fieldset>

      <Controller
        name='description'
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Fieldset
              id={`${formName}-description`}
              label='description'
              error={error}
              optionalField
            >
              <TextEditor
                id='description'
                value={value}
                onChange={onChange}
                placeholder='A brief about the project...'
              />
            </Fieldset>
          )
        }}
      />

      <x.div display='flex' spaceX={3}>
        {onDelete && (
          <Button
            name='delete project'
            type='button'
            variant='outline'
            color='critical'
            size='large'
            justifyContent='center'
            w='30%'
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
        <Button
          name='submit project'
          type='submit'
          isLoading={isSubmitting}
          size='large'
          justifyContent='center'
          w='100%'
        >
          {id === 'edit' ? 'Update' : 'Create'}
        </Button>
      </x.div>
    </Form>
  )
}

export default ProjectForm
