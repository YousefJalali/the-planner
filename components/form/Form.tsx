import { x } from '@xstyled/styled-components'
import { usePrompt } from '../../common/contexts/PromptCtx'
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
  isDirty?: boolean
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
  isDirty,
}: Props) {
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
      {children}

      <LoadingOverlay isSubmitting={isSubmitting} />
    </x.form>
  )
}

export default Form
