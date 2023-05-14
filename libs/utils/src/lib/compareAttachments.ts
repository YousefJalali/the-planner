import { Attachment } from '@the-planner/types'
import * as _ from 'lodash'

export const compareAttachments = (
  oldAttachments: Attachment[],
  newAttachments: Attachment[]
) => {
  const toBeRemoved = _.differenceBy(oldAttachments, newAttachments, 'id')
  const toBeUploaded = _.differenceBy(newAttachments, oldAttachments, 'id')

  return { toBeRemoved, toBeUploaded }
}
