import { Image } from '@prisma/client'
import * as _ from 'lodash'

export const compareAttachments = (
  oldAttachments: Image[],
  newAttachments: Image[]
) => {
  const toBeRemoved = _.differenceBy(oldAttachments, newAttachments, 'id')
  const toBeUploaded = _.differenceBy(newAttachments, oldAttachments, 'id')

  return { toBeRemoved, toBeUploaded }
}
