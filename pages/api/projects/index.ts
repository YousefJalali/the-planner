import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ProjectType } from '../../../common/types/ProjectType'
import { prisma } from '../../../common/lib/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: ProjectType[]
    error?: Error | unknown
    nextCursor?: string
  }>
) => {
  const { cursor, limit } = req.query

  try {
    const projects = await prisma.project.findMany({
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
    })

    const nextCursor =
      projects[+limit - 1]?.id || projects[projects.length - 1]?.id

    return res.status(200).json({ data: projects, nextCursor })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export default handler
