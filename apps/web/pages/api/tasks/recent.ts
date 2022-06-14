import type { NextApiRequest, NextApiResponse } from 'next'
import { TaskType } from '@the-planner/types'
import { prisma } from '../../../common/lib/prisma'
import { addCurrentTime, UTCDate } from '@the-planner/utils'
import sub from 'date-fns/sub'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: TaskType[]; error?: Error | unknown }>
) => {
  const lastThreeDays = sub(new Date(), {
    days: 3,
  })

  const threeDaysBefore = UTCDate(addCurrentTime(lastThreeDays))

  try {
    const tasks = await prisma.task.findMany({
      where: {
        startDate: {
          gte: threeDaysBefore,
        },
      },
      take: 5,
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
