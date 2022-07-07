import { usePrompt } from '@the-planner/hooks'
import { x } from '@xstyled/styled-components'
import Head from 'next/head'
import { Children, cloneElement } from 'react'
import FormHeader from './form-header'
import LoadingOverlay from './loading-overlay'

type Props<T> = {
  id: string
  name: string
  title?: string
  children: any
  onRequestClose?: () => void
  onSubmit: () => void
  isSubmitting?: boolean
  isDirty?: boolean
}
// const Header = dynamic(() => import('./FormHeader'))

export function Form<T>({
  id,
  name,
  title,
  children,
  isSubmitting = false,
  onRequestClose,
  onSubmit,
  isDirty,
}: Props<T>) {
  const { setPrompt } = usePrompt()

  const onCloseHandler = () => {
    if (onRequestClose) {
      if (isDirty) {
        setPrompt({
          id: 'task-form',
          title: 'are you sure?',
          message: "you can't undo this",
          action: 'discard',
          actionFn: onRequestClose,
        })
      } else {
        onRequestClose()
      }
    }
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>

      <LoadingOverlay isSubmitting={isSubmitting} />

      <x.form
        id={`${id}-${name}`}
        name={name}
        spaceY={5}
        p={3}
        onSubmit={onSubmit}
      >
        {title && (
          <FormHeader
            title={title}
            onRequestClose={isSubmitting ? undefined : onCloseHandler}
          />
        )}
        {Children.map(children, (child) => {
          return cloneElement(child, { formName: name })
        })}
      </x.form>
    </>
  )
}

export default Form
