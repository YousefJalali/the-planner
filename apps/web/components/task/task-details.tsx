import { FC } from 'react'
import { useRouter } from 'next/router'

import { TaskWithProject } from '@the-planner/types'
import { formatDate, formatTime, statusAlias } from '@the-planner/utils'
import { Badge } from '../ui'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type Props = {
  task: TaskWithProject
  onClose?: () => void
  onRoute?: (action?: any) => void
}

export const TaskDetails: FC<Props> = ({ task, onClose, onRoute }) => {
  const {
    id,
    title,
    project,
    projectId,
    attachments,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    status,
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
      <section className="px-6 my-6 space-y-5">
        {/* project */}
        <section className="flex justify-between">
          <div className="flex">
            <div
              className="w-1 mr-2 rounded-xl"
              style={{ backgroundColor: project.color }}
            />
            <div>
              <span className="label-text">Project</span>

              <h1
                className="text-2xl leading-tight font-bold"
                onClick={() => linkHandler(`/projects/${projectId}`)}
              >
                {project.title}
              </h1>
            </div>
          </div>
        </section>

        {/* task */}
        <div>
          <span className="label-text">Task</span>
          <a onClick={() => linkHandler(`/tasks/${id}`)}>
            <h2
              data-testid="taskDetails-title"
              className="text-xl font-semibold"
            >
              {title}
            </h2>
          </a>

          {description?.length > 0 && (
            <div className="font-text mt-2 max-h-[200px] overflow-y-scroll opacity-60 leading-relaxed">
              <p>{description}</p>
            </div>
          )}
        </div>

        {/* Date & Time */}
        <section className="space-y-2 ">
          <div>
            <span className="label-text">Created On</span>

            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <span>{formatDate(startDate)}</span>
                {startTime && <span>{formatTime(startTime)}</span>}
              </div>

              <Badge status={status}>{statusAlias(status)}</Badge>
            </div>
          </div>

          {/* Due Date */}
          {endDate && (
            <div>
              <span className="label-text">Due Date</span>

              <div className="flex gap-3">
                <span>{formatDate(endDate)}</span>
                {endTime && <span>{formatTime(endTime)}</span>}
              </div>
            </div>
          )}
        </section>
      </section>

      {/* attachments */}
      <>
        {attachments.length > 0 && (
          <section className="my-4">
            <div className="ml-6 mb-1">
              <span className="label-text">Attachments</span>
            </div>
            <div className="space-x-3 flex overflow-x-scroll w-full px-6">
              {attachments.map((img) => (
                <div
                  key={img.id}
                  className="rounded-xl overflow-hidden h-[156px]"
                  style={{
                    flex: `0 0 ${`${(img.width * 156) / img.height}px`}`,
                  }}
                >
                  <Zoom>
                    <Image
                      src={img.path}
                      alt={title}
                      height={img.height}
                      width={img.width}
                    />
                  </Zoom>
                </div>
              ))}
            </div>
          </section>
        )}
      </>
    </>
  )
}

export default TaskDetails
