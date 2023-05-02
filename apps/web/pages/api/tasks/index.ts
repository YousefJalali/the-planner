import type { NextApiRequest, NextApiResponse } from 'next'
import { Task } from '@the-planner/types'
import { prisma } from '../../../common/lib/prisma'
import { isValid, parse } from 'date-fns'
import {
  addCurrentTime,
  UTCDate,
  URL_DATE_FORMAT,
  parseUrlDate,
} from '@the-planner/utils'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: Task[]; error?: Error | unknown }>
) => {
  const { d } = req.query

  const date = parseUrlDate(d as string)
  // const date = parse(d as string, URL_DATE_FORMAT, new Date())

  if (!d || typeof d !== 'string' || !isValid(date)) {
    return res.json({ error: 'Invalid date' })
  }

  const startDate = UTCDate(addCurrentTime(date))

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
