import styled from 'styled-components'

const Form = styled.form`
  > fieldset {
    &:not(:last-child) {
      margin-bottom: ${({ theme }) => theme.space[3]}px;
    }
  }
`

export default Form
