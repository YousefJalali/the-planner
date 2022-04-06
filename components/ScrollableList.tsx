import styled, { x } from '@xstyled/styled-components'

const ScrollableList = styled(x.ul)`
  display: flex;
  padding: 0 4;
  overflow-x: scroll;

  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  &::after {
    content: '';
    padding-right: 24px;
  }
`
export default ScrollableList
