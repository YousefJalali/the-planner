import styled from 'styled-components'

const Select = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${({ theme: { space } }) => `${space[2]}px ${space[1]}px`};
  background-color: ${({ theme: { colors } }) => colors.layout.level0};
  border: none;
  border-radius: ${({ theme: { radii } }) => `${radii[3]}px `};
`

export default Select
