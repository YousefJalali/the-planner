import ObjectID from 'bson-objectid'

import { Project } from '@the-planner/types'

import { projectFormValidation } from '@the-planner/utils'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ColorResult } from 'react-color'
import { ColorInput } from '../../ui'
import randomColor from 'randomcolor'

type Props = {
  id: 'edit' | 'create'
  defaultValues?: Partial<Project>
  onSubmit: (data: Project) => void
  isSubmitting?: boolean
  onDelete?: () => void
  serverErrors?: object
}

const initialDefaultValues = () =>
  ({
    id: ObjectID().toHexString(),
    title: '',
    description: '',
    color: randomColor(),
    isHidden: false,
    updatedAt: new Date(),
    createdAt: new Date(),
  } as Project)

export function ProjectForm({
  id,
  defaultValues,
  onSubmit,
  isSubmitting,
  onDelete,
  serverErrors,
}: Props) {
  const formName = 'project-form'

  const defValues = {
    ...initialDefaultValues(),
    ...defaultValues,
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Project>({
    defaultValues: defValues,
    resolver: yupResolver(projectFormValidation),
  })

  const submitHandler = async (data: Project) => {
    onSubmit(data)
  }

  return (
    <form className="p-6 prose" onSubmit={handleSubmit(submitHandler)}>
      <h1 className="">{id === 'create' ? 'New' : 'Update'} Project</h1>

      <fieldset
        className="not-prose space-y-6"
        disabled={id === 'create' && isSubmitting}
      >
        <div className="flex space-x-2">
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

            <label htmlFor="title" className="label">
              <span className="label-text-alt">
                Select a color so it will be easy for you to organize your
                projects
              </span>
            </label>

            {errors?.title && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.title.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="title" className="label invisible">
              <span className="label-text">Color</span>
            </label>
            <Controller
              control={control}
              name="color"
              render={({ field: { onChange, value } }) => (
                <ColorInput
                  color={value}
                  onChange={(color: ColorResult) => onChange(color.hex)}
                />
              )}
            />
          </div>
        </div>

        <div className="form-control w-full">
          <label htmlFor="Description" className="label">
            <span className="label-text">Description</span>
          </label>

          <textarea
            id="description"
            placeholder="A brief about the project..."
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

        <div className="flex gap-4">
          {onDelete && (
            <button
              name="delete project"
              type="button"
              className={`btn btn-error btn-outline ${
                isSubmitting ? 'loading' : ''
              }`}
              onClick={onDelete}
            >
              Delete
            </button>
          )}

          <button
            name="submit project"
            type="submit"
            className={`btn btn-primary flex-1 ${
              isSubmitting ? 'loading' : ''
            }`}
          >
            {id === 'edit' ? 'Update' : 'Create'} Project
          </button>
        </div>
      </fieldset>
    </form>
  )
}

export default ProjectForm
