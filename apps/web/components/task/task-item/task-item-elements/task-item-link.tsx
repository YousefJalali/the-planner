import { x } from '@xstyled/styled-components'

type Props = {
  onClick: () => void
  children: JSX.Element[]
}

export const Link = ({ onClick, children }: Props) => {
  return (
    <x.a
      data-testid="taskItem-details"
      onClick={onClick}
      display="flex"
      flexDirection="column"
      flex="0 0 calc(100% - 36px - 36px)"
      pr={1}
      userSelect="none"
      cursor="pointer"
    >
      {children}
    </x.a>
  )
}

export default Link
