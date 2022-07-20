import { useYupValidationResolver } from '@the-planner/hooks'
import { addServerErrors } from '@the-planner/utils'
import { x } from '@xstyled/styled-components'
import Head from 'next/head'
import { useEffect } from 'react'
import {
  DeepPartial,
  FormProvider,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
  UseFormReturn,
} from 'react-hook-form'
import { AnyObjectSchema } from 'yup'
import LoadingOverlay from './loading-overlay'

type Props<T> = {
  id: string
  name: string
  children: JSX.Element[]
  submitHandler: SubmitHandler<T>
  schema: AnyObjectSchema
  defaultValues: UnpackNestedValue<DeepPartial<T>>
  serverErrors?: object
  isSubmitting?: boolean
}

export type MethodsWithFormName = UseFormReturn & { formName: string }

export function Form<T>({
  id,
  name,
  children,
  submitHandler,
  schema,
  defaultValues,
  serverErrors,
  isSubmitting,
}: Props<T>) {
  // const { setPrompt } = usePrompt()

  // const onCloseHandler = () => {
  //   if (onRequestClose) {
  //     if (isDirty) {
  //       setPrompt({
  //         id: name,
  //         title: 'are you sure?',
  //         message: "you can't undo this",
  //         action: 'discard',
  //         actionFn: onRequestClose,
  //       })
  //     } else {
  //       onRequestClose()
  //     }
  //   }
  // }

  const resolver = useYupValidationResolver<T>(schema)

  const methods = useForm<T>({
    defaultValues,
    resolver,
  })

  const {
    handleSubmit,
    setError,
    formState: { isDirty },
    clearErrors,
  } = methods

  useEffect(() => {
    if (serverErrors) {
      addServerErrors(serverErrors, setError)
    }
    return () => {
      clearErrors()
    }
  }, [serverErrors])

  const methodsWithFormName: MethodsWithFormName = {
    ...(methods as UseFormReturn),
    formName: name,
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>

      <FormProvider {...methodsWithFormName}>
        <x.form
          id={`${id}-${name}`}
          name={name}
          spaceY={5}
          p={3}
          onSubmit={handleSubmit(submitHandler)}
        >
          {children}
        </x.form>
      </FormProvider>

      <LoadingOverlay isSubmitting={isSubmitting} />
    </>
  )
}

export default Form
