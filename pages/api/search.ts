import type { NextApiRequest, NextApiResponse } from 'next'
import { TaskType } from '../../common/types/TaskType'
import { prisma } from '../../common/lib/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: TaskType[]; error?: Error | unknown }>
) => {
  const { q } = req.query

  try {
    const tasks = await prisma.task.findMany({
      where: {
        title: {
          contains: q as string,
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
