import { x } from '@xstyled/styled-components'
import { FiPlus } from 'react-icons/fi'

export const FloatingButton = ({ ...props }) => {
  return (
    <x.button
      aria-label="floating button"
      position="fixed"
      bottom="24px"
      right="24px"
      h={48}
      w={48}
      borderRadius="full"
      backgroundColor="brand-primary"
      boxShadow={0}
      zIndex={800}
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <x.div color="layout-level0" fontSize="2rem">
        <FiPlus />
      </x.div>
    </x.button>
  )
}

export default FloatingButton
