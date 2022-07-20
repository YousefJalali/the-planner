import styled from '@xstyled/styled-components'

export const Card = styled.div<{ color: string }>`
  width: 100%;
  max-width: 400px;
  height: 150px;
  padding: 3;
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  background: ${(props) =>
    `linear-gradient(135deg, ${props.color}0D 0%, ${props.color}4D 100%)`};
  border-radius: 3;
`
