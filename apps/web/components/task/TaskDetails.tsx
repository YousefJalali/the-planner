import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FiX } from 'react-icons/fi'
import styled, { x } from '@xstyled/styled-components'
import Zoom from 'react-medium-image-zoom'

import 'react-medium-image-zoom/dist/styles.css'
import { TaskWithProjectType } from '@the-planner/types'
import Tag from './Tag'
import { Button, TextEditor, Label, ScrollableList } from '@the-planner/ui-web'
import { formatDate, formatTime } from '@the-planner/utils'

type Props = {
  task: TaskWithProjectType
  onClose?: (action?: any) => void
  onRoute?: (action?: any) => void
}

const ImageItem = styled(x.div)`
  *:focus {
    outline: none;
  }

  img {
    border-radius: 2;
  }
`

const TaskDetails: FC<Props> = ({ task, onClose, onRoute }) => {
  const {
    title,
    project,
    projectId,
    attachments,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
  } = task

  const router = useRouter()

  const linkHandler = (route: string) => {
    router.push(route)
    if (onClose) {
      onClose()
    }
    if (onRoute) {
      onRoute()
    }
  }

  return (
    <>
      <x.section px={4} mt={4} spaceY={5} mb={5}>
        {/* project */}
        <x.div display="flex" justifyContent="space-between">
          <x.div display="flex">
            <x.div
              backgroundColor={project.color}
              w="0.3rem"
              mr={2}
              borderRadius={4}
            />
            <x.div>
              <Label>Project</Label>

              <x.h1
                text="headline.three"
                lineHeight="tight"
                color="content-contrast"
                onClick={() => linkHandler(`/projects/${projectId}`)}
              >
                {project.title}
              </x.h1>
            </x.div>
          </x.div>
          {onClose && (
            <Button
              name="close"
              variant="textOnly"
              onClick={onClose}
              borderRadius="full"
              flex="0 0 36px"
              backgroundColor="layout-level0accent"
            >
              <x.span fontSize="1rem" color="content-contrast">
                <FiX />
              </x.span>
            </Button>
          )}
        </x.div>

        {/* task */}
        <x.div>
          <Label>Task</Label>
          <x.a onClick={() => linkHandler(`/tasks/${task.id}`)}>
            <x.h2
              text="body.large"
              color="content-contrast"
              fontWeight="bold"
              data-testid="taskDetails-title"
            >
              {title}
            </x.h2>
          </x.a>

          {description?.length > 0 && (
            <x.div mt={2} maxHeight="200px" overflowY="scroll">
              <TextEditor value={description} readOnly />
            </x.div>
          )}
        </x.div>

        {/* Date & Time */}
        <div>
          <x.div>
            <Label>Created On</Label>

            <x.div
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <x.div display="flex">
                <x.p color="content.subtle">{formatDate(startDate)}</x.p>
                {startTime && (
                  <x.p color="content.subtle" ml={2}>
                    {formatTime(startTime)}
                  </x.p>
                )}
              </x.div>

              <Tag variant={task.status} />
            </x.div>
          </x.div>

          {/* Due Date */}
          {endDate && (
            <x.div mt={2}>
              <Label>Due Date</Label>

              <x.div display="flex">
                <x.p color="content.subtle">{formatDate(endDate)}</x.p>
                {endTime && (
                  <x.p color="content.subtle" ml={2}>
                    {formatTime(endTime)}
                  </x.p>
                )}
              </x.div>
            </x.div>
          )}
        </div>
      </x.section>

      {/* attachments */}
      {attachments.length > 0 && (
        <x.section my={3}>
          <x.div ml={4}>
            <Label>Attachments</Label>
          </x.div>
          <ScrollableList spaceX={3}>
            {attachments.map((img) => (
              <ImageItem
                key={img.id}
                h="100%"
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
        </x.section>
      )}
    </>
  )
}

export default TaskDetails
