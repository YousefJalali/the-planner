import ObjectID from 'bson-objectid'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Task } from '@the-planner/types'
import { prisma } from '../../../common/lib/prisma'
import { apiYupValidation } from '@the-planner/hooks'
import { taskFormValidation } from '@the-planner/utils'
import _ from 'lodash'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: object
    error?: Error | unknown
    validationErrors?: any
  }>
) => {
  const tasks = req.body

  if (!tasks) {
    return res
      .status(400)
      .json({ error: 'Something went wrong, please try again' })
  }

  try {
    // tasks.forEach(async (task: Task) => {
    //   //validate form
    //   const validate = await apiYupValidation<Task>(taskFormValidation, task)

    //   if (!_.isEmpty(validate.errors)) {
    //     return res.json({ validationErrors: validate.errors })
    //   }
    // })

    // const taskss = tasks.map(async (task: Task) => {
    //   const paths = task.attachments.map((attachment: Image) => attachment.path)
    //   const { images, error } = await uploadImages(paths, task.id)

    //   if (error) {
    //     return res.status(400).json({ error })
    //   }

    //   return { ...task, attachments: images }
    // })

    const createdTask = await prisma.task.createMany({
      data: tasks,
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
