import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ProjectType } from '../../../common/types/ProjectType'
import { prisma } from '../../../common/lib/prisma'
import { Status } from '../../../common/types/TaskType'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: ProjectType[]
    error?: Error | unknown
    nextCursor?: string
  }>
) => {
  const { cursor, limit, q } = req.query

  // return res.status(400).json({ error: 'wrong' })

  try {
    const projects = await prisma.project.findMany({
      ...(q &&
        q !== 'undefined' &&
        q === Status.COMPLETED.toLowerCase() && {
          where: {
            progressPercentage: {
              equals: 100,
            },
          },
        }),

      ...(q &&
        q !== 'undefined' &&
        q === Status.INPROGRESS.toLowerCase() && {
          where: {
            progressPercentage: {
              lt: 100,
            },
          },
        }),

      ...(limit &&
        limit !== 'undefined' && {
          take: +limit,
        }),

      ...(cursor &&
        cursor !== 'undefined' && {
          skip: 1,
          cursor: {
            id: cursor as string,
          },
        }),

      orderBy: [{ createdAt: 'desc' }],
    })

    const nextCursor =
      projects[+limit - 1]?.id || projects[projects.length - 1]?.id

    return res
      .status(200)
      .json({ data: projects, ...(limit && { nextCursor }) })
    // .json({ data: projects, nextCursor })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export default handler
