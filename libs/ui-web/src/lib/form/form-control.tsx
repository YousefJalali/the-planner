import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form'
import { MethodsWithFormName } from './form'

export type ChildrenProps = {
  id: string
  field: ControllerRenderProps
  fieldState: ControllerFieldState
  methods: UseFormReturn
}

type Props = {
  name: string
  children: ({ id, field, fieldState, methods }: ChildrenProps) => JSX.Element
}

export function FormControl({ name, children }: Props) {
  const methods = useFormContext()

  return (
    <Controller
      name={name}
      control={methods.control}
      render={({ field, fieldState }) => {
        return (
          <>
            {children({
              id: `${(methods as MethodsWithFormName).formName}-${name}`,
              field,
              fieldState,
              methods,
            })}
          </>
        )
      }}
    />
  )
}

export default FormControl
