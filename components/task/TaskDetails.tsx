import Image from 'next/image'
import { FC } from 'react'
import { X, XCircle } from 'lucide-react'
import { TaskType, imgType } from '../../common/types/TaskType'
import formatDate from '../../common/utils/formatDate'
import { Box, Text } from '../../styles'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import styled from 'styled-components'

type Props = {
  task: TaskType
  onClose: () => void
}

const Label = (props: { text: string }) => (
  <Text fontFamily='roboto' fontSize={1} color='content.nonessential' mb={0}>
    {props.text}
  </Text>
)

const AttachmentsList = styled(Box)`
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;

  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  img {
    border-radius: 10px;
  }
`

const TaskDetails: FC<Props> = ({ task, onClose }) => {
  let time = 'Open task'
  if (!task.isOpen) {
    const [, startTime] = formatDate(task.startTime)
    const [, endTime] = formatDate(task.endTime)
    time = `${startTime} - ${endTime}`
  }

  // console.log(task)
  return (
    <>
      <Box
        backgroundColor='layout.level0accent'
        borderRadius='10px 10px 0 0'
        overflow='hidden'
        pb={3}
      >
        <Box px={3} mt={3}>
          {/* project */}
          <Box display='flex' justifyContent='space-between'>
            <Box display='flex'>
              <Box backgroundColor={task.project.color} width={4} mr={1} />
              <Box>
                <Label text='Project' />
                <Text fontSize={4} fontWeight='bold' color='content.contrast'>
                  {task.project.title}
                </Text>
              </Box>
            </Box>
            <Box onClick={onClose}>
              <XCircle />
            </Box>
          </Box>

          {/* task */}
          <Box mt={2}>
            <Label text='Task' />
            <Text fontSize={3} fontWeight='bold' color='content.contrast'>
              {task.title}
            </Text>
            <Box mt={1} maxHeight={200} overflowY='scroll'>
              <Text lineHeight={2} color='content.subtle'>
                {task.description}
              </Text>
            </Box>
          </Box>

          {/* time */}
          <Box mt={2}>
            <Label text='Time' />
            <Text color='content.subtle'>{time}</Text>
          </Box>
        </Box>

        {/* attachments */}
        {task.attachments.length > 0 && (
          <Box mt={2}>
            <Box ml={3}>
              <Label text='Attachments' />
            </Box>
            <AttachmentsList pl={3}>
              {task.attachments.map((img) => (
                <Box
                  flex='0 0 calc(30% - 24px)'
                  key={img.id}
                  mr={2}
                  overflow='hidden'
                >
                  <Zoom>
                    <Image
                      src={img.path}
                      alt={task.title}
                      height={img.height}
                      width={img.width}
                    />
                  </Zoom>
                </Box>
              ))}
            </AttachmentsList>
          </Box>
        )}
      </Box>
    </>
  )
}

export default TaskDetails
