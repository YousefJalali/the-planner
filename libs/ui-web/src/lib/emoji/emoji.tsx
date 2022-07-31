import { x } from '@xstyled/styled-components'
import { FC } from 'react'
type Props = {
  label: string
  symbol: string
  height: number
}
export const Emoji: FC<Props> = ({ label, symbol, height }) => (
  <x.span
    h={height}
    w={height}
    className="emoji"
    role="img"
    aria-label={label}
    aria-hidden="false"
  >
    {symbol}
  </x.span>
)
export default Emoji
