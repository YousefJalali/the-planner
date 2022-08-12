import { x } from '@xstyled/styled-components'
import ObjectID from 'bson-objectid'

import { ProjectType } from '@the-planner/types'

import {
  Form,
  Button,
  TextEditor,
  ColorInput,
  Input,
  Fieldset,
  FormControl,
  SupportiveText,
} from '@the-planner/ui-web'
import { projectSchema } from '@the-planner/utils'

type Props = {
  id: 'edit' | 'create'
  defaultValues?: Partial<ProjectType>
  onSubmit: (data: ProjectType) => void
  isSubmitting?: boolean
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

export function ProjectForm({
  id,
  defaultValues = initialDefaultValues,
  onSubmit,
  isSubmitting,
  onDelete,
  serverErrors,
}: Props) {
  const formName = 'project-form'

  const deftValues = {
    ...initialDefaultValues,
    ...defaultValues,
  }

  const submitHandler = async (data: ProjectType) => {
    onSubmit(data)
  }

  return (
    <Form
      id={id}
      name={formName}
      submitHandler={submitHandler}
      isSubmitting={isSubmitting}
      schema={projectSchema}
      defaultValues={deftValues}
      serverErrors={serverErrors}
    >
      <x.div>
        <x.div display="flex" spaceX={2}>
          {/* Title */}
          <FormControl<ProjectType, string> name="title">
            {({ id, field: { value, onChange }, fieldStatus }) => (
              <Fieldset id={id} label="title" fieldStatus={fieldStatus}>
                <Input
                  id={id}
                  value={value}
                  onChange={onChange}
                  type="text"
                  placeholder="i.e. speakers"
                />
              </Fieldset>
            )}
          </FormControl>

          {/* Color */}
          <FormControl<ProjectType, string> name="color">
            {({ id, field: { value, onChange }, fieldStatus }) => (
              <Fieldset
                id={id}
                label="color"
                hideLabel
                fieldStatus={fieldStatus}
                w="fit-content"
              >
                <ColorInput id={id} value={value} onChange={onChange} />
              </Fieldset>
            )}
          </FormControl>
        </x.div>
        <SupportiveText>
          select a color so it will be easy for you to organize your projects
        </SupportiveText>
      </x.div>

      <FormControl<ProjectType, string> name="description">
        {({ id, field: { value, onChange }, fieldStatus }) => (
          <Fieldset id={id} label="description" fieldStatus={fieldStatus}>
            <TextEditor
              id={id}
              value={value}
              onChange={onChange}
              placeholder="A brief about the project..."
            />
          </Fieldset>
        )}
      </FormControl>

      <x.div display="flex" spaceX={3}>
        {onDelete && (
          <Button
            name="delete project"
            type="button"
            variant="outline"
            color="critical"
            size="large"
            justifyContent="center"
            w="30%"
            onClick={onDelete}
          >
            Delete
          </Button>
        )}
        <Button
          name="submit project"
          type="submit"
          isLoading={isSubmitting}
          size="large"
          justifyContent="center"
          w="100%"
        >
          {id === 'edit' ? 'Update' : 'Create'}
        </Button>
      </x.div>
    </Form>
  )
}

export default ProjectForm
