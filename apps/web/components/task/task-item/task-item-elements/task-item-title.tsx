import styled, { x } from '@xstyled/styled-components'

export const TaskTitleWrapper = styled(x.p)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const Title = ({
  children,
  isTaskCompleted,
}: {
  children: string
  isTaskCompleted: boolean
}) => (
  <TaskTitleWrapper
    text="body"
    textDecoration={isTaskCompleted && 'line-through'}
    color={isTaskCompleted ? 'content-nonessential' : 'content-contrast'}
    data-testid="taskItem-title"
  >
    {children}
  </TaskTitleWrapper>
)

export default Title
