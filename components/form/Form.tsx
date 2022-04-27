import { x } from '@xstyled/styled-components'
import dynamic from 'next/dynamic'
import FormHeader from './FormHeader'
import LoadingOverlay from './LoadingOverlay'

type Props = {
  id: string
  name: string
  title?: string
  children: any
  onRequestClose?: () => void
  onSubmit: () => void
  isSubmitting?: boolean
}
// const Header = dynamic(() => import('./FormHeader'))

function Form({
  id,
  name,
  title,
  children,
  isSubmitting = false,
  onRequestClose,
  onSubmit,
}: Props) {
  return (
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
          onRequestClose={isSubmitting ? undefined : onRequestClose}
        />
      )}
      {children}

      <LoadingOverlay isSubmitting={isSubmitting} />
    </x.form>
  )
}

export default Form
