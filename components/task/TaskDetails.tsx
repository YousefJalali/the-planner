import { FC } from 'react'
import Image from 'next/image'
import styled, { x } from '@xstyled/styled-components'
import { FiX, FiXCircle } from 'react-icons/fi'
import { TaskType, TaskProjectType } from '../../common/types/TaskType'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import format from 'date-fns/format'
import TextEditor from '../formElements/TextEditor'
import Icon from '../Icon'

type Props = {
  task: TaskType
  onClose: () => void
}

const Label = (props: { text: string }) => (
  <x.p fontSize='sm' color='content-nonessential' mb={1}>
    {props.text}
  </x.p>
)

const AttachmentsList = styled(x.div)`
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

  return (
    <>
      <x.div
        backgroundColor='layout-level0accent'
        borderRadius='3 3 0 0'
        overflow='hidden'
        pb={4}
      >
        <x.div px={4} mt={4}>
          {/* project */}
          <x.div display='flex' justifyContent='space-between'>
            <x.div display='flex'>
              <x.div
                backgroundColor={(project as TaskProjectType).color}
                w='0.3rem'
                mr={2}
                borderRadius={4}
              />
              <x.div>
                <Label text='Project' />
                <x.h1
                  text='headline.three'
                  lineHeight='tight'
                  color='content-contrast'
                >
                  {(project as TaskProjectType).title}
                </x.h1>
              </x.div>
            </x.div>
            <x.div onClick={onClose}>
              <Icon icon={FiXCircle} size='xl' color='content-contrast' />
            </x.div>
          </x.div>

          {/* task */}
          <x.div mt={3}>
            <Label text='Task' />
            <x.p text='body.large' color='content-contrast'>
              {title}
            </x.p>
            {description?.length > 0 && (
              <x.div mt={2} maxHeight='200px' overflowY='scroll'>
                <TextEditor value={description} readOnly />
              </x.div>
            )}
          </x.div>

          {/* time */}
          <x.div mt={3}>
            <Label text='Date' />
            <x.p color='content.subtle'>{formatDate}</x.p>
          </x.div>
        </x.div>

        {/* attachments */}
        {attachments.length > 0 && (
          <x.div mt={3}>
            <x.div ml={4}>
              <Label text='Attachments' />
            </x.div>
            <AttachmentsList pl={4}>
              {attachments.map((img) => (
                <x.div
                  flex='0 0 calc(30% - 24px)'
                  key={img.id}
                  mr={3}
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
                </x.div>
              ))}
            </AttachmentsList>
          </x.div>
        )}
      </x.div>
    </>
  )
}

export default TaskDetails
