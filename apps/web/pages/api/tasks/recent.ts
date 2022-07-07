import type { NextApiRequest, NextApiResponse } from 'next'
import { TaskType } from '@the-planner/types'
import { prisma } from '../../../common/lib/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: TaskType[]; error?: Error | unknown }>
) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { project: { select: { title: true, color: true } } },
    })

    return res.status(200).json({ data: tasks })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

export default handler
