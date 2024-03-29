import type { NextApiRequest, NextApiResponse } from 'next'
import { Attachment, Task } from '@the-planner/types'
import { prisma } from '../../common/lib/prisma'
import { isValid } from 'date-fns'
import {
  addCurrentTime,
  UTCDate,
  parseUrlDate,
  uploadImages,
  compareAttachments,
} from '@the-planner/utils'
import { FieldErrors } from 'react-hook-form'
import ObjectID from 'bson-objectid'
import omit from 'lodash-es/omit'

import { v2 as cloudinary } from 'cloudinary'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { isAuthenticated } from 'apps/web/config/isAuthenticated'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Task[] | Task
    error?: Error | unknown
    validationErrors?: any
  }>
) => {
  let user = null
  const uid = await isAuthenticated(req)
  if (uid) {
    user = await prisma.user.findFirst({
      where: { uid },
    })
  }

  if (req.method === 'GET') {
    const { d, limit, taskId, projectId } = req.query

    try {
      // Get task by taskId
      if (taskId) {
        if (typeof taskId !== 'string') {
          return res.status(404).json({ error: 'task not found' })
        }

        if (!user) {
          return res.status(401).json({ error: 'not authorized' })
        }

        const task = await prisma.task.findFirst({
          where: {
            id: taskId,
            userId: user.id,
          },
          include: { project: { select: { title: true, color: true } } },
        })

        if (!task) {
          return res.status(404).json({ error: 'task not found' })
        }

        return res.status(200).json({ data: task })
      }

      // Get tasks by projectId
      if (projectId) {
        if (typeof projectId !== 'string') {
          return res.status(404).json({ error: 'project not found' })
        }

        if (!user) {
          return res.status(401).json({ error: 'not authorized' })
        }

        const tasks = await prisma.task.findMany({
          where: {
            projectId,
            userId: user.id,
          },
          orderBy: { createdAt: 'desc' },
          include: { project: { select: { title: true, color: true } } },
        })

        if (!tasks) {
          return res.status(404).json({ error: 'tasks not found' })
        }

        return res.status(200).json({ data: tasks })
      }

      if (!user) {
        return res.status(200).json({ data: [] })
      }

      const date = parseUrlDate(d as string)
      const startDate = UTCDate(addCurrentTime(date))

      const tasks = await prisma.task.findMany({
        where: {
          userId: user.id,
          ...(d &&
            typeof d === 'string' &&
            isValid(date) && {
              startDate,
            }),
        },

        ...(limit &&
          limit !== 'undefined' && {
            take: +limit,
          }),

        orderBy: { createdAt: 'desc' },
        include: { project: { select: { title: true, color: true } } },
      })

      return res.status(200).json({ data: tasks })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error })
    }
  }

  if (req.method === 'POST') {
    const task: Task = req.body

    if (!task)
      return res
        .status(400)
        .json({ error: 'Something went wrong, please try again' })

    if (!user) return res.status(401).json({ error: 'not authorized' })

    try {
      //validate form
      // const validate = await apiYupValidation<Task>(taskFormValidation, task)

      // if (!_.isEmpty(validate.errors)) {
      //   return res.json({ validationErrors: validate.errors })
      // }

      //check if project exist in DB
      const project = await prisma.project.findFirst({
        where: {
          id: task.projectId,
          userId: user.id,
        },
      })

      if (!project) {
        return res.status(400).json({
          validationErrors: {
            projectId: {
              type: 'required',
              message: 'Cannot find the selected project',
            } as FieldErrors<Task>,
          },
        })
      }

      const paths = task.attachments.map(
        (attachment: Attachment) => attachment.path
      )
      const { images, error } = await uploadImages(
        paths,
        task.projectId,
        task.id,
        cloudinary.uploader.upload
      )

      if (error) return res.status(400).json({ error })

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
          userId: user.id,
        },
        include: { project: { select: { title: true, color: true } } },
      })

      res.status(200).json({ data: createdTask })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }

  if (req.method === 'PUT') {
    const taskForm = req.body

    if (!taskForm) return res.status(400).json({ error: 'Task not fount' })

    if (!user) return res.status(401).json({ error: 'not authorized' })

    try {
      //check if task exist in DB
      const existedTask = await prisma.task.findFirst({
        where: { id: taskForm.id, userId: user.id },
      })
      if (!existedTask) {
        return res.status(400).json({ error: 'Task not found' })
      }

      //remove project key from task object
      let task = omit(taskForm, 'project') as Task

      //validate form
      // const validate = await apiYupValidation<Task>(taskFormValidation, task)
      // if (!_.isEmpty(validate.errors)) {
      //   return res.json({ validationErrors: validate.errors })
      // }

      //check if project exist in DB
      const project = await prisma.project.findFirst({
        where: {
          id: task.projectId,
          userId: user.id,
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
        const ids = toBeRemoved.map((attachment: Attachment) => attachment.id)
        try {
          await cloudinary.api.delete_resources(ids, function (error, result) {
            if (error) {
              return res
                .status(400)
                .json({ error: 'Error while deleting attachments' })
            }
          })
        } catch (error) {
          return res
            .status(400)
            .json({ error: 'Error while deleting attachments' })
        }
      }

      if (toBeUploaded.length > 0) {
        const paths = toBeUploaded.map(
          (attachment: Attachment) => attachment.path
        )

        let images: Attachment[] = []

        try {
          const { images, error } = await uploadImages(
            paths,
            task.projectId,
            task.id,
            cloudinary.uploader.upload
          )

          if (error || !images) {
            return res.status(400).json({ error })
          }
        } catch (error) {
          return res
            .status(400)
            .json({ error: 'Error while uploading attachments' })
        }

        task = { ...task, attachments: [...images, ...task.attachments] }
      }

      //push updated task
      const updatedTask = await prisma.task.update({
        where: { id: task.id },
        data: omit(task, 'id'),
        include: { project: { select: { title: true, color: true } } },
      })

      res.status(200).json({ data: updatedTask })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error })
    }
  }

  if (req.method === 'DELETE') {
    const { taskId } = req.query

    if (typeof taskId !== 'string')
      return res.status(404).json({ error: 'Task not found!' })

    if (!user) return res.status(401).json({ error: 'not authorized' })

    try {
      const taskToBeDeleted = await prisma.task.findFirst({
        where: { id: taskId, userId: user.id },
      })

      if (!taskToBeDeleted)
        return res.status(401).json({ error: 'Task not found' })

      const deletedTask = await prisma.task.delete({
        where: { id: taskToBeDeleted.id },
      })

      if (deletedTask.attachments.length > 0) {
        const ids = deletedTask.attachments.map((attachment) => attachment.id)

        try {
          await cloudinary.api.delete_resources(ids, function (error, result) {
            if (error) {
              return res
                .status(400)
                .json({ error: 'Error while deleting attachments' })
            }
          })
        } catch (error) {
          return res
            .status(400)
            .json({ error: 'Error while deleting attachments' })
        }
      }

      return res.status(200).json({ data: deletedTask })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return res.status(400).json({ error: 'Sorry! Something went wrong!' })
      }
      return res.status(500).json({ error })
    }
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
