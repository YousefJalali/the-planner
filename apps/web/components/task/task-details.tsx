import { formatDate, formatTime, statusAlias } from '@the-planner/utils'
import { Badge, ErrorMessage, Spinner } from '../ui'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useTask } from '@the-planner/data'
import Link from 'next/link'

export const TaskDetails = ({ taskId }: { taskId: string }) => {
  const { task, error, isLoading } = useTask(taskId)

  return isLoading ? (
    <div className="flex justify-center p-6">
      <Spinner />
    </div>
  ) : error ? (
    <div className="px-6 flex justify-center">
      <ErrorMessage error={error} />
    </div>
  ) : !task ? (
    <div className="flex justify-center p-6">Task not found</div>
  ) : (
    <>
      <section className="p-6 space-y-5">
        {/* project */}
        <section className="flex justify-between">
          <div className="flex">
            <div
              className="w-1 mr-2 rounded-xl"
              style={{ backgroundColor: task.project.color }}
            />
            <div>
              <span className="label-text">Project</span>

              <Link href={`/projects/${task.projectId}`}>
                <h1 className="text-2xl leading-tight font-bold hover:underline transition-all">
                  {task.project.title}
                </h1>
              </Link>
            </div>
          </div>
        </section>

        {/* task */}
        <div>
          <span className="label-text">Task</span>
          <Link href={`/tasks/${task.id}`}>
            <h2
              data-testid="taskDetails-title"
              className="text-xl font-semibold hover:underline transition-all"
            >
              {task.title}
            </h2>
          </Link>

          {task.description?.length > 0 && (
            <div className="mt-2 relative after:content[' '] after:absolute after:bottom-0 after:left-0 after:w-full after:h-8 after:bg-gradient-to-t from-base-100 relative after:content[' '] after:absolute after:bottom-0 after:left-0 after:w-full after:h-8 after:bg-gradient-to-t from-base-100">
              <p className="font-text pb-8 max-h-[200px] overflow-y-scroll opacity-60 leading-relaxed  ">
                {task.description}
              </p>
            </div>
          )}
        </div>

        {/* Date & Time */}
        <section className="space-y-2 ">
          <div>
            <span className="label-text">Created On</span>

            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <span>{formatDate(task.startDate)}</span>
                {task.startTime && <span>{formatTime(task.startTime)}</span>}
              </div>

              <Badge status={task.status}>{statusAlias(task.status)}</Badge>
            </div>
          </div>

          {/* Due Date */}
          {task.endDate && (
            <div>
              <span className="label-text">Due Date</span>

              <div className="flex gap-3">
                <span>{formatDate(task.endDate)}</span>
                {task.endTime && <span>{formatTime(task.endTime)}</span>}
              </div>
            </div>
          )}
        </section>
      </section>

      {/* attachments */}
      <>
        {task.attachments.length > 0 && (
          <section className="my-4">
            <div className="ml-6 mb-1">
              <span className="label-text">Attachments</span>
            </div>
            <div className="space-x-3 flex overflow-x-scroll w-full px-6">
              {task.attachments.map((img) => (
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
                      alt={task.title}
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
