import { Attachment } from '@the-planner/types'
import differenceBy from 'lodash-es/differenceBy'

export const compareAttachments = (
  oldAttachments: Attachment[],
  newAttachments: Attachment[]
) => {
  const toBeRemoved = differenceBy(oldAttachments, newAttachments, 'id')
  const toBeUploaded = differenceBy(newAttachments, oldAttachments, 'id')

  return { toBeRemoved, toBeUploaded }
}
