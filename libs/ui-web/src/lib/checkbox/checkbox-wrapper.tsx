import { x } from '@xstyled/styled-components'
import { memo } from 'react'
import { FiCheck } from 'react-icons/fi'

export const Wrapper = memo(
  ({ color, checked }: { color: string; checked: boolean }) => {
    return (
      <x.span
        display="block"
        position="relative"
        w="50%"
        h="50%"
        minHeight={24}
        minWidth={24}
        backgroundColor={color}
        borderRadius="full"
      >
        <x.span
          display="flex"
          position="absolute"
          top="50%"
          left="50%"
          w="80%"
          h="80%"
          transform
          translateX="-50%"
          translateY="-50%"
          backgroundColor={checked ? color : 'layout-level0'}
          borderRadius="full"
          border="2px solid"
          borderColor="layout-level0"
          color="layout-level0"
          fontSize="60%"
          justifyContent="center"
          alignItems="center"
        >
          <FiCheck />
        </x.span>
      </x.span>
    )
  }
)

export default Wrapper
