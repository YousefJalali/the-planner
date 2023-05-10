import { FC } from 'react'
type Props = {
  label: string
  symbol: string
  height: number
}
export const Emoji: FC<Props> = ({ label, symbol, height }) => (
  <span
    style={{ height, width: height }}
    className="emoji"
    role="img"
    aria-label={label}
    aria-hidden="false"
  >
    {symbol}
  </span>
)
export default Emoji
