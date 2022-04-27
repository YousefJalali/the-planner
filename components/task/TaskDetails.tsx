import { FC, useContext } from 'react'
import Image from 'next/image'
import styled, { x } from '@xstyled/styled-components'
import { FiXCircle } from 'react-icons/fi'
import { TaskType, TaskWithProjectType } from '../../common/types/TaskType'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import format from 'date-fns/format'
import TextEditor from '../formElements/TextEditor'
import Icon from '../Icon'
import ScrollableList from '../ScrollableList'
import { useRouter } from 'next/router'

type Props = {
  task: TaskWithProjectType
  onClose?: (action?: any) => void
}

const Label = (props: { text: string }) => (
  <x.p fontSize='sm' color='content-nonessential' mb={1}>
    {props.text}
  </x.p>
)

const ImageItem = styled(x.div)`
  *:focus {
    outline: none;
  }

  img {
    border-radius: 10px;
  }
`

const TaskDetails: FC<Props> = ({ task, onClose }) => {
  const { title, project, attachments, description, startDate } = task

  const router = useRouter()

  return (
    <>
      <x.div px={4} mt={4} spaceY={5} mb={5}>
        {/* project */}
        <x.div display='flex' justifyContent='space-between'>
          <x.div display='flex'>
            <x.div
              backgroundColor={project.color}
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
                {project.title}
              </x.h1>
            </x.div>
          </x.div>
          {onClose && (
            <x.div onClick={onClose}>
              <Icon icon={FiXCircle} size='xl' color='content-contrast' />
            </x.div>
          )}
        </x.div>

        {/* task */}
        <x.div mt={3}>
          <Label text='Task' />
          <x.a
            onClick={() => router.push(`/tasks/${task.id}`)}
            textDecoration='underline'
          >
            <x.p
              text='body.large'
              color='content-contrast'
              fontWeight='bold'
              data-testid='taskDetails-title'
            >
              {title}
            </x.p>
          </x.a>

          {description?.length > 0 && (
            <x.div mt={2} maxHeight='200px' overflowY='scroll'>
              <TextEditor value={description} readOnly />
            </x.div>
          )}
        </x.div>

        {/* time */}
        <x.div mt={3}>
          <Label text='Date' />
          <x.p color='content.subtle'>
            {format(new Date(startDate), 'PPPP')}
          </x.p>
        </x.div>
      </x.div>

      {/* attachments */}
      {attachments.length > 0 && (
        <x.div mt={3}>
          <x.div ml={4}>
            <Label text='Attachments' />
          </x.div>
          <ScrollableList spaceX={3}>
            {attachments.map((img) => (
              <ImageItem
                key={img.id}
                h='100%'
                flex={`0 0 ${`${(img.width * 156) / img.height}px`}`}
              >
                <Zoom>
                  <Image
                    src={img.path}
                    alt={title}
                    height={img.height}
                    width={img.width}
                  />
                </Zoom>
              </ImageItem>
            ))}
          </ScrollableList>
        </x.div>
      )}
    </>
  )
}

export default TaskDetails
