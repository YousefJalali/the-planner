import { FieldStatus } from '@the-planner/ui-web'
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  Path,
  useFormContext,
  UseFormReturn,
  UseFormStateReturn,
} from 'react-hook-form'
import { MethodsWithFormName } from './form'

type ChildrenProps<T> = {
  id: string
  methods: UseFormReturn<T>
  fieldStatus: FieldStatus
}

type ControllerProps<T, U> = {
  field: {
    value: U
  } & ControllerRenderProps<T, Path<T>>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<T>
}

type Props<T, U> = {
  name: Path<T>
  children: ({
    id,
    methods,
    field,
    fieldStatus,
  }: ChildrenProps<T> & Pick<ControllerProps<T, U>, 'field'>) => JSX.Element
}

export function FormControl<T, U>({ name, children }: Props<T, U>) {
  const methods = useFormContext<T>()

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({
        field,
        fieldState: { error, isDirty },
      }: ControllerProps<T, U>) => {
        return (
          <>
            {children({
              id: `${(methods as MethodsWithFormName).formName}-${String(
                name
              )}`,
              field,
              fieldStatus: {
                error: error,
                isSuccess: !error && isDirty,
              },
              methods,
            })}
          </>
        )
      }}
    />
  )
}

export default FormControl
