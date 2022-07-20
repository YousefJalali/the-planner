import { Status } from '@the-planner/types'
import { Badge } from '@the-planner/ui-web'
import { statusAlias } from '@the-planner/utils'
import styled, { css, x } from '@xstyled/styled-components'

const Wrapper = styled(x.div)<{
  withDivider?: boolean
}>`
  padding-bottom: 4;

  ${(props) =>
    props.withDivider &&
    css`
      border-radius: 2;
      padding: 2;
      height: fit-content;
    `}
`

type Props = {
  children: JSX.Element | JSX.Element[]
  withDivider?: boolean
  status: Status
  count: number
}

const ListWrapper = ({
  children,
  withDivider = false,
  status,
  count,
}: Props) => {
  return (
    <Wrapper
      pb={4}
      spaceY={2}
      withDivider={withDivider}
      backgroundColor={withDivider ? `tag-${status}-a10` : 'transparent'}
    >
      <Badge color={`tag-${status}`} count={count} textOnly={!withDivider}>
        {statusAlias(status)}
      </Badge>
      {children}
    </Wrapper>
  )
}

export default ListWrapper
