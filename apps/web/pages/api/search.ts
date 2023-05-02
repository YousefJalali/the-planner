import type { NextApiRequest, NextApiResponse } from 'next'
import { Task } from '@the-planner/types'
import { prisma } from '../../common/lib/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: Task[]; error?: Error | unknown }>
) => {
  const { q } = req.query

  try {
    const tasks = await prisma.task.findMany({
      where: {
        title: {
          contains: q as string,
          mode: 'insensitive',
        },
      },
      orderBy: { createdAt: 'desc' },
      include: { project: { select: { title: true, color: true } } },
    })

    return res.status(200).json({ data: tasks })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

export default handler
