import ObjectID from 'bson-objectid'
import { Image } from '@prisma/client'
import { FieldErrors } from 'react-hook-form'
import _ from 'lodash'

import type { NextApiRequest, NextApiResponse } from 'next'
import { TaskType } from '../../../common/types/TaskType'
import { prisma } from '../../../common/lib/prisma'
import { apiYupValidation } from '../../../common/hooks/useYupValidationResolver'
import taskSchema from '../../../common/utils/validations/taskSchema'
import { uploadImages } from '../../../common/utils/cloudinary'
import { UTCDate } from '../../../common/utils/dateHelpers'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: TaskType
    error?: Error | unknown
    validationErrors?: any
  }>
) => {
  const task: TaskType = req.body

  // return res.status(400).json({ error: 'something wrong happened' })

  // return res.json({
  //   validationErrors: {
  //     projectId: {
  //       type: 'required',
  //       message: 'Cannot find the selected project',
  //     } as FieldErrors<TaskType>,
  //   },
  // })

  if (!task) {
    return res
      .status(400)
      .json({ error: 'Something went wrong, please try again' })
  }

  try {
    //validate form
    const validate = await apiYupValidation<TaskType>(taskSchema, task)

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
      return res.status(400).json({
        validationErrors: {
          projectId: {
            type: 'required',
            message: 'Cannot find the selected project',
          } as FieldErrors<TaskType>,
        },
      })
    }

    const paths = task.attachments.map((attachment: Image) => attachment.path)
    const { images, error } = await uploadImages(paths, task.projectId, task.id)

    if (error) {
      return res.status(400).json({ error })
    }

    let id = task.id
    if (!ObjectID.isValid(id)) {
      id = ObjectID().toHexString()
    }

    const createdTask = await prisma.task.create({
      data: {
        ...task,
        id,
        attachments: images,
        startDate: UTCDate(task.startDate),
        endDate: task.endDate ? UTCDate(task.endDate) : null,
      },
      include: { project: { select: { title: true, color: true } } },
    })

    res.status(200).json({ data: createdTask })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
}

export default handler
