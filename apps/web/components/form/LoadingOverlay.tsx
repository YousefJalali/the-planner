import styled, { x } from '@xstyled/styled-components'
import { FC } from 'react'

type Props = {
  isSubmitting?: boolean
}

const LoadingOverlay: FC<Props> = ({ isSubmitting }) => {
  return isSubmitting ? (
    <x.div
      position='fixed'
      top={0}
      left={0}
      w='100%'
      h='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      zIndex={2}
    >
      <Blur
        position='absolute'
        top={0}
        left={0}
        h='100%'
        w='100%'
        // backgroundColor='layout-level0'
      ></Blur>

      <x.div zIndex={3}>Please wait...</x.div>
    </x.div>
  ) : null
}

const Blur = styled(x.div)`
  /* filter: blur(4px); */
  backdrop-filter: blur(3px);
`

export default LoadingOverlay
