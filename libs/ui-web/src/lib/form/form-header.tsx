import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { FiX } from 'react-icons/fi'
import { Button } from '@the-planner/ui-web'

type Props = {
  title: string
  onRequestClose?: () => void
}

export const FormHeader: FC<Props> = ({ title, onRequestClose }) => {
  return (
    <x.div
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="sticky"
      top={0}
      zIndex={1}
      backgroundColor="layout-level0"
      py={1}
    >
      <x.h1 text="headline.one">{title}</x.h1>
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

export default FormHeader
