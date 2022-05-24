import type { NextApiRequest, NextApiResponse } from 'next'
import { TaskType } from '../../../common/types/TaskType'
import { prisma } from '../../../common/lib/prisma'
import { isValid, parse } from 'date-fns'
import { DATE_FORMAT } from '../../../common/constants'
import { dateToUTC } from '../../../common/utils/dateToUTC'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: TaskType[]; error?: Error | unknown }>
) => {
  const { d } = req.query

  const date = parse(d as string, DATE_FORMAT, new Date())

  if (!d || typeof d !== 'string' || !isValid(date)) {
    return res.json({ error: 'Invalid date' })
  }

  // const startDate = new Date(
  //   Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1)
  // )

  const startDate = dateToUTC(date, true)

  console.log('before UTC', date)
  console.log('after UTC', startDate)

  try {
    const tasks = await prisma.task.findMany({
      where: {
        startDate,
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
