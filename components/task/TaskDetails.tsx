import Image from 'next/image'
import { FC } from 'react'
import { X, XCircle } from 'lucide-react'
import { TaskType, TaskProjectType } from '../../common/types/TaskType'
import { getTime } from '../../common/utils/formatDate'
import { Box, Text } from '../../styles'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import styled from 'styled-components'
import format from 'date-fns/format'
import TextEditor from '../formElements/TextEditor'

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
  const { title, project, attachments, description, time, date } = task

  let formatDate = format(new Date(date.startDate), 'MM/dd/yyyy')

  // if (time.startTime && time.endTime) {
  //   const start = getTime(startTime)
  //   const end = getTime(endTime)

  //   time = `${start} - ${end}`
  // }

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
              <Box
                backgroundColor={(project as TaskProjectType).color}
                width={4}
                mr={1}
              />
              <Box>
                <Label text='Project' />
                <Text fontSize={4} fontWeight='bold' color='content.contrast'>
                  {(project as TaskProjectType).title}
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
              {title}
            </Text>
            {description?.length > 0 && (
              <Box mt={1} maxHeight={200} overflowY='scroll'>
                <TextEditor value={description} readOnly />
              </Box>
            )}
          </Box>

          {/* time */}
          <Box mt={2}>
            <Label text='Date' />
            <Text color='content.subtle'>{formatDate}</Text>
          </Box>
        </Box>

        {/* attachments */}
        {attachments.length > 0 && (
          <Box mt={2}>
            <Box ml={3}>
              <Label text='Attachments' />
            </Box>
            <AttachmentsList pl={3}>
              {attachments.map((img) => (
                <Box
                  flex='0 0 calc(30% - 24px)'
                  key={img.id}
                  mr={2}
                  overflow='hidden'
                >
                  {(img.width && img.height && (
                    <Zoom>
                      <Image
                        src={img.path}
                        alt={title}
                        height={img.height}
                        width={img.width}
                      />
                    </Zoom>
                  )) || <div>cant display image (no dimensions)</div>}
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
