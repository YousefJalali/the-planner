import { x } from '@xstyled/styled-components'
import { useForm, Controller, UseFormSetError } from 'react-hook-form'
import _, { uniqueId } from 'lodash'

import Input from '../formElements/Input'
import TextEditor from '../formElements/TextEditor'
import Fieldset from '../formElements/Fieldset'

import useYupValidationResolver from '../../common/utils/validations/useYupValidationResolver'

import { ProjectType } from '../../common/types/ProjectType'
import ColorInput from '../formElements/ColorInput'
import randomColor from 'randomcolor'
import Button from '../formElements/Button'
import Form from '../form/Form'
import projectSchema from '../../common/utils/validations/projectSchema'

type Props<T> = {
  id: 'edit' | 'create'
  title?: string
  defaultValues?: ProjectType
  onSubmit: (data: ProjectType, setError: UseFormSetError<ProjectType>) => void
  isSubmitting: boolean
  onRequestClose?: () => void
}

const initialDefaultValues: ProjectType = {
  id: uniqueId(),
  title: '',
  description: '',
  color: randomColor(),
  proposed: 0,
  inprogress: 0,
  completed: 0,
  progressPercentage: 0,
  isHidden: false,
}

function ProjectForm<T>({
  id,
  title,
  defaultValues = initialDefaultValues,
  onSubmit,
  isSubmitting,
  onRequestClose,
}: Props<T>) {
  const resolver = useYupValidationResolver<ProjectType>(projectSchema)

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ProjectType>({
    defaultValues,
    resolver,
  })

  const onSubmitHandler = async (data: ProjectType) => {
    console.log('project form submitted')
    onSubmit(data, setError)
  }

  const formName = 'project-form'

  return (
    <Form
      id={id}
      name={formName}
      title={title}
      onRequestClose={onRequestClose}
      onSubmit={handleSubmit(onSubmitHandler)}
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
        {id === 'edit' && (
          <Button
            variant='textOnly'
            color='critical'
            justifyContent='center'
            // flex='0 0 30%'
            // w='100%'
          >
            Delete
          </Button>
        )}
        <Button
          type='submit'
          position='sticky'
          zIndex={3}
          bottom={24}
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
