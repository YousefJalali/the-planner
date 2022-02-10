import { FC } from 'react'
import { Box, Subhead } from '../../styles'

type Props = {
  tasks: JSX.Element[]
  title?: string
  titleColor?: string
}
const TasksList: FC<Props> = ({ tasks, title, titleColor }) => {
  return (
    <>
      <Subhead
        size='subtle'
        px={3}
        mb={1}
        mt={3}
        color={titleColor || 'content.subtle'}
      >
        • {title}
      </Subhead>
      <Box as='ul' px={3} pb={3}>
        {tasks}
      </Box>
    </>
  )
}

export default TasksList
