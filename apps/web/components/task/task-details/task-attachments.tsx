import { Attachment } from '@the-planner/types'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type Props = {
  title: string
  attachments: Attachment[]
}

const TaskAttachments = ({ title, attachments }: Props) => {
  return (
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
                style={{ flex: `0 0 ${`${(img.width * 156) / img.height}px`}` }}
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
  )
}

export default TaskAttachments
