import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  Status,
  TaskType,
  TaskWithProjectType,
} from '../../../../common/types/TaskType'
import { prisma } from '../../../../common/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: TaskWithProjectType[] | TaskType
    error?: Error | unknown
  }>
) => {
  const {
    query: { task: taskId, status },
    method,
  } = req

  if (!taskId || typeof taskId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Something went wrong, please try again' })
  }

  switch (method) {
    //get task by id
    case 'GET':
      const task = await prisma.task.findUnique({
        where: {
          id: taskId as string,
        },
        include: {
          project: { select: { title: true, color: true } },
        },
      })

      if (!task) {
        return res.status(404).json({ error: 'Task not found' })
      }

      return res.status(200).json({ data: task })

    //change task status
    case 'PUT':
      try {
        const updatedTask = await prisma.task.update({
          where: {
            id: taskId,
          },
          data: {
            status: status as Status,
          },
          include: {
            project: { select: { title: true, color: true } },
          },
        })

        return res.status(200).json({ data: updatedTask })
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          return res.status(400).json({ error: 'Sorry! Something went wrong!' })
        }
        return res.status(500).json({ error })
      }

    default:
      res.status(400).send({ error: 'method not allowed' })
  }
}

export default handler
