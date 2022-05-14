import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Status, TaskType } from '../../../../common/types/TaskType'
import { prisma } from '../../../../common/lib/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: TaskType
    error?: Error | unknown
  }>
) => {
  const {
    query: { task: taskId, status },
    method,
  } = req

  if (!taskId) {
    return res
      .status(400)
      .json({ error: 'Something went wrong, please try again' })
  }

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

  switch (method) {
    //get task by id
    case 'GET':
      return res.status(200).json({ data: task })

    //change task status
    case 'PUT':
      try {
        const updatedTask = await prisma.task.update({
          where: {
            id: task.id,
          },
          data: {
            status: status as Status,
          },
          include: {
            project: { select: { title: true, color: true } },
          },
        })

        if (status === Status.COMPLETED) {
          await prisma.project.update({
            where: {
              id: updatedTask.projectId,
            },
            data: {
              countOfCompletedTasks: {
                increment: 1,
              },
            },
          })
        }

        if (task.status === Status.COMPLETED && status !== Status.COMPLETED) {
          await prisma.project.update({
            where: {
              id: updatedTask.projectId,
            },
            data: {
              countOfCompletedTasks: {
                decrement: 1,
              },
            },
          })
        }

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
