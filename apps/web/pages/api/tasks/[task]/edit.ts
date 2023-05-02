import type { NextApiRequest, NextApiResponse } from 'next'
import { Task } from '@the-planner/types'
import { prisma } from '../../../../common/lib/prisma'
import { apiYupValidation } from '@the-planner/hooks'
import _ from 'lodash'
import { FieldErrors } from 'react-hook-form'
import { v2 as cloudinary } from 'cloudinary'

import {
  // deleteImages,
  uploadImages,
  taskSchema,
  compareAttachments,
} from '@the-planner/utils'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Task
    error?: Error | unknown
    validationErrors?: any
  }>
) => {
  const taskForm = req.body
  if (!taskForm) return

  try {
    //check if task exist in DB
    const existedTask = await prisma.task.findUnique({
      where: { id: taskForm.id },
    })
    if (!existedTask) {
      return res.status(400).json({ error: 'Task not found' })
    }

    //remove project key from task object
    let task = _.omit(taskForm, 'project') as Task

    //validate form
    const validate = await apiYupValidation<Task>(taskSchema, task)
    if (!_.isEmpty(validate.errors)) {
      return res.json({ validationErrors: validate.errors })
    }

    //check if project exist in DB
    const project = await prisma.project.findUnique({
      where: {
        id: task.projectId,
      },
    })
    if (!project) {
      return res.json({
        validationErrors: {
          projectId: {
            type: 'required',
            message: 'Cannot find the selected project',
          } as FieldErrors<Task>,
        },
      })
    }

    const { toBeRemoved, toBeUploaded } = compareAttachments(
      existedTask.attachments,
      task.attachments
    )

    if (toBeRemoved.length > 0) {
      const ids = toBeRemoved.map((attachment) => attachment.id)
      // await deleteImages(ids)
    }
    if (toBeUploaded.length > 0) {
      const paths = toBeUploaded.map((attachment) => attachment.path)

      const { images, error } = await uploadImages(
        paths,
        task.projectId,
        task.id,
        cloudinary.uploader.upload
      )

      if (error || !images) {
        return res.status(400).json({ error })
      }

      task = { ...task, attachments: [...images, ...task.attachments] }
    }

    //push updated task
    const updatedTask = await prisma.task.update({
      where: { id: task.id },
      data: _.omit(task, 'id'),
      include: { project: { select: { title: true, color: true } } },
    })

    res.status(200).json({ data: updatedTask })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export default handler
