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

function ProjectForm({
  id,
  title,
  defaultValues = initialDefaultValues,
  onSubmit,
  isSubmitting,
  onRequestClose,
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
    <>
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
            <FormControl name="title">
              {({ id, field: { value, onChange }, fieldState }) => (
                <Fieldset id={id} label="title" fieldState={fieldState}>
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
            <FormControl name="color">
              {({ id, field: { value, onChange }, fieldState }) => (
                <Fieldset
                  id={id}
                  label="color"
                  hideLabel
                  fieldState={fieldState}
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

        <FormControl name="description">
          {({ id, field: { value, onChange }, fieldState }) => (
            <Fieldset id={id} label="description" fieldState={fieldState}>
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
    </>
  )
}

export default ProjectForm
