import type { NextApiRequest, NextApiResponse } from 'next'
import { TaskType } from '../../../../common/types/TaskType'
import { prisma } from '../../../../common/lib/prisma'
import { apiYupValidation } from '../../../../common/hooks/useYupValidationResolver'
import taskSchema from '../../../../common/utils/validations/taskSchema'
import _ from 'lodash'
import { FieldErrors } from 'react-hook-form'
import { deleteImages } from '../../../../common/utils/cloudinary'

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
    //check if task exist in DB
    const deletedTask = await prisma.task.delete({
      where: { id: taskId },
    })

    if (deletedTask.attachments.length > 0) {
      const ids = deletedTask.attachments.map((attachment) => attachment.id)
      await deleteImages(ids)
    }

    return res.status(200).json({ data: deletedTask })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error })
  }
}

export default handler
