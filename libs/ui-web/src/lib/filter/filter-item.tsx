import { x } from '@xstyled/styled-components'

export const FilterItem = ({
  children,
  onClick,
  active,
}: {
  children: string
  onClick: () => void
  active: boolean
}) => (
  <x.div
    py={1}
    px={3}
    borderRadius={50}
    backgroundColor={active ? 'brand-primary' : 'layout-level0accent'}
    onClick={onClick}
    h="fit-content"
  >
    <x.span
      text="body.small"
      textTransform="capitalize"
      lineHeight="none"
      color={active && 'layout-level0'}
      userSelect="none"
      whiteSpace="nowrap"
    >
      {children}
    </x.span>
  </x.div>
)

export default FilterItem
