import { x } from '@xstyled/styled-components'
import {
  useForm,
  Controller,
  UseFormSetError,
  UseFormClearErrors,
  FieldErrors,
  FieldError,
} from 'react-hook-form'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import Input from '../formElements/Input'
import TextEditor from '../formElements/TextEditor'
import Fieldset from '../formElements/Fieldset'

import taskSchema from '../../common/utils/validations/taskSchema'
import useYupValidationResolver from '../../common/utils/validations/useYupValidationResolver'
import { parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { ProjectType } from '../../common/types/ProjectType'
import ColorInput from '../formElements/ColorInput'

type Props<T> = {
  id: string
  defaultValues?: ProjectType
  onSubmit: (
    data: ProjectType,
    setError: UseFormSetError<ProjectType>,
    clearErrors: UseFormClearErrors<ProjectType>
  ) => void
}

export const setFormErrors = (
  errors: FieldErrors,
  setError: UseFormSetError<ProjectType>
) => {
  for (const [key, value] of Object.entries(errors)) {
    setError(key as keyof ProjectType, {
      type: 'manual',
      message: (value as FieldError).message,
    })
  }
}

const initialDefaultValues: ProjectType = {
  id: uuidv4(),
  title: '',
  description: '',
  color: '',
  tasks: [],
  proposed: 0,
  inprogress: 0,
  completed: 0,
  progressPercentage: 0,
  isHidden: false,
}

function ProjectForm<T>({
  id,
  defaultValues = initialDefaultValues,
  onSubmit,
}: Props<T>) {
  // const resolver = useYupValidationResolver<ProjectType>(taskSchema)

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
  } = useForm<ProjectType>({
    defaultValues,
    // resolver,
  })

  const onSubmitHandler = async (data: ProjectType) => {
    console.log('formData', data)
    onSubmit(data, setError, clearErrors)
  }

  return (
    <x.form id={id} spaceY={5} onSubmit={handleSubmit(onSubmitHandler)}>
      {/* Title */}
      <Controller
        name='title'
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Fieldset
              id='project-form-title'
              label='Project title'
              error={error}
            >
              <Input
                id='project-form-title'
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
        name='description'
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Fieldset
              // id='project-form-description'
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

      <Controller
        name='color'
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <Fieldset
              id='project-form-color'
              label='Project color'
              error={error}
              // noBorder
            >
              {/* <x.input
                h='50px'
                p={0}
                id='project-form-color'
                type='color'
                value={value}
                onChange={onChange}
              /> */}
              <ColorInput value={value} onChange={onChange} />
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

export default ProjectForm
