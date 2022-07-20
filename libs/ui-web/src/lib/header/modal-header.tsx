import { PaddingProps, x } from '@xstyled/styled-components'
import { FiX } from 'react-icons/fi'
import { Button } from '@the-planner/ui-web'

type Props = {
  children: JSX.Element | string
  onRequestClose?: () => void
} & PaddingProps

export const ModalHeader = ({ children, onRequestClose, ...props }: Props) => {
  return (
    <x.div
      w="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="sticky"
      top={0}
      zIndex={1}
      backgroundColor="layout-level0"
      spaceX={1}
      py={1}
      {...props}
    >
      {typeof children === 'string' ? (
        <x.h1 text="headline.one">{children}</x.h1>
      ) : (
        children
      )}
      {onRequestClose && (
        <Button
          name="close"
          variant="textOnly"
          onClick={onRequestClose}
          borderRadius="full"
          flex="0 0 36px"
          backgroundColor="layout-level0accent"
        >
          <x.span fontSize="1rem" color="content-contrast">
            <FiX />
          </x.span>
        </Button>
      )}
    </x.div>
  )
}

export default ModalHeader
