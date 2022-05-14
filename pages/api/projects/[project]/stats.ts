import { Prisma } from '.prisma/client'
import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../common/lib/prisma'

export type StatsType = (Prisma.PickArray<
  Prisma.TaskGroupByOutputType,
  'status'[]
> & {
  _count: {
    _all: number
  }
})[]

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: StatsType
    error?: Error | unknown
    nextCursor?: string
  }>
) => {
  const projectId = req.query.project

  if (!projectId || typeof projectId !== 'string') {
    return res
      .status(400)
      .json({ error: 'Something went wrong, please try again' })
  }

  try {
    const projectStats = await prisma.task.groupBy({
      where: {
        projectId: projectId,
      },
      by: ['status'],
      _count: {
        _all: true,
      },
    })

    if (!projectStats) {
      return res.status(404).json({ error: 'Project not found' })
    }

    return res.status(200).json({ data: projectStats })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export default handler
