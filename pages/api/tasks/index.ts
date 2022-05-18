import type { NextApiRequest, NextApiResponse } from 'next'
import { TaskType } from '../../../common/types/TaskType'
import { prisma } from '../../../common/lib/prisma'
import { isValid } from 'date-fns'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: TaskType[]; error?: Error | unknown }>
) => {
  const { d } = req.query

  console.log('query', d)

  if (!d || typeof d !== 'string' || !isValid(new Date(d))) {
    return res.json({ error: 'Invalid date' })
  }

  const startDate = new Date(d)
  startDate.setHours(0, 0, 0, 0)
  console.log('startDate', startDate)

  // 2022-05-18T21:00:00.000Z
  // 2022-03-31T21:00:00.000+00:00

  try {
    const tasks = await prisma.task.findMany({
      where: {
        startDate: {
          lte: startDate,
        },
      },
      // take: 5,
      include: { project: { select: { title: true, color: true } } },
    })

    // console.log('prisma req', tasks)

    return res.status(200).json({ data: tasks })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

export default handler
