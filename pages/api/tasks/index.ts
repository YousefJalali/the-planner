import type { NextApiRequest, NextApiResponse } from 'next'
import { TaskType } from '../../../common/types/TaskType'
import { prisma } from '../../../common/lib/prisma'
import { format, isValid, parse } from 'date-fns'
import { DATE_FORMAT } from '../../../common/constants'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: TaskType[]; error?: Error | unknown }>
) => {
  const { d } = req.query

  console.log('query', d)

  const date = parse(d as string, DATE_FORMAT, new Date())

  if (!d || typeof d !== 'string' || !isValid(date)) {
    return res.json({ error: 'Invalid date' })
  }

  const startDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  )

  console.log('parsed date: ', date, startDate)

  try {
    const tasks = await prisma.task.findMany({
      where: {
        startDate,
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
