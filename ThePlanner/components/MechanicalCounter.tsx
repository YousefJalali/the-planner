import { x } from '@xstyled/styled-components'

const FONT_SIZE = 14

const Item = ({ top, children }: { top: number; children: number }) => (
  <x.div
    position='absolute'
    top={0}
    left={0}
    h='100%'
    w='100%'
    display='flex'
    justifyContent='center'
    alignItems='center'
  >
    <x.span fontSize={FONT_SIZE} lineHeight='none'>
      {children}
    </x.span>
  </x.div>
)

const MechanicalCounter = () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <x.div display='flex' h={FONT_SIZE} border='1px solid' borderColor='red'>
      {new Array(3).fill(0).map((e, i) => (
        <x.div position='relative' w={9}>
          <Item top={50}>{numbers[i]}</Item>
        </x.div>
      ))}
    </x.div>
  )
}

export default MechanicalCounter
