import { x } from '@xstyled/styled-components'

const Grid = () => {
  return (
    <x.div
      position='absolute'
      display='flex'
      zIndex={1000}
      top='0'
      left='0'
      h='100vh'
      w='100vw'
      spaceX='24px'
      px='24px'
      opacity={0.2}
    >
      <x.div backgroundColor='red' h='100%' w='100%'></x.div>
      <x.div backgroundColor='red' h='100%' w='100%'></x.div>
      <x.div backgroundColor='red' h='100%' w='100%'></x.div>
      <x.div backgroundColor='red' h='100%' w='100%'></x.div>
    </x.div>
  )
}

export default Grid
