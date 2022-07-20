import { ImageType } from '@the-planner/types'
import { Label, ScrollableList } from '@the-planner/ui-web'
import styled, { x } from '@xstyled/styled-components'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type Props = {
  title: string
  attachments: ImageType[]
}

const ImageItem = styled(x.div)`
  *:focus {
    outline: none;
  }

  img {
    border-radius: 2;
  }
`

const TaskAttachments = ({ title, attachments }: Props) => {
  return (
    <>
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

export default TaskAttachments
