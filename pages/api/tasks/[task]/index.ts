import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Status, TaskWithProjectType } from '../../../../common/types/TaskType'
import { prisma } from '../../../../common/lib/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: TaskWithProjectType
    error?: Error | unknown
    nextCursor?: string
  }>
) => {
  const {
    query: { task: taskId, status },
    method,
  } = req

  if (!taskId) return

  switch (method) {
    //get task by id
    case 'GET':
      try {
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
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
      }

    //change task status
    case 'PUT':
      try {
        const task = await prisma.task.update({
          where: {
            id: taskId as string,
          },
          data: {
            status: status as Status,
          },
          include: {
            project: { select: { title: true, color: true } },
          },
        })

        return res.status(200).json({ data: task })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
      }

    default:
      res.status(400).send({ error: 'method not allowed' })
  }
}

export default handler
