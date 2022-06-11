import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { TaskType } from '../../../../common/types/TaskType'
import { prisma } from '../../../../common/lib/prisma'
import { deleteImages } from '../../../../common/utils/cloudinary'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: TaskType
    error?: Error | unknown
    validationErrors?: any
  }>
) => {
  const taskId = req.query.task

  if (!taskId || typeof taskId !== 'string') return

  try {
    const deletedTask = await prisma.task.delete({
      where: { id: taskId },
    })

    if (deletedTask.attachments.length > 0) {
      const ids = deletedTask.attachments.map((attachment) => attachment.id)
      await deleteImages(ids)
    }

    return res.status(200).json({ data: deletedTask })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(400).json({ error: 'Sorry! Something went wrong!' })
    }
    return res.status(500).json({ error })
  }
}

export default handler
