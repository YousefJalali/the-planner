import styled from 'styled-components'
import { Text } from '../../styles'
import NoTasksSVG from '../../styles/illustrations/NoTasksSVG'
import Button from '../formElements/Button'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.space[5]}px 0;

  svg {
    width: 50%;
    height: auto;
  }
`

const NoTasks = () => {
  return (
    <Wrapper>
      <NoTasksSVG />
      <Text color='content.contrast' fontSize={3} mt={3}>
        No pending tasks today
      </Text>
      <Text color='content.nonessential' fontSize={1} mt={0}>
        Write down some tasks
      </Text>
      {/* <Button variant='primary'>Add Task</Button> */}
    </Wrapper>
  )
}

export default NoTasks
