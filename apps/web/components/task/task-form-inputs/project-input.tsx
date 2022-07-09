import { Fieldset } from '@the-planner/ui-web'
import { Controller } from 'react-hook-form'
import SelectProject from '../../project/SelectProject'
import { FormProps, SetValue } from './FormProps'

export const Project = ({
  control,
  formName,
  setValue,
}: FormProps & SetValue) => {
  return (
    <Controller
      name="projectId"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Fieldset id={`${formName}-project`} label="Project" error={error}>
            <SelectProject
              id={`${formName}-project`}
              value={value}
              onChange={onChange}
              taskProject={(project) => setValue('project', project)}
              placeholder="Select a project"
            />
          </Fieldset>
        )
      }}
    />
  )
}

export default Project
