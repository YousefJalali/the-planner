import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ProjectType } from '@the-planner/types'
import { prisma } from '../../../common/lib/prisma'
import { Status } from '@the-planner/types'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: ProjectType[] | Partial<ProjectType>[]
    error?: Error | unknown
    nextCursor?: string
  }>
) => {
  const { cursor, limit, q } = req.query

  try {
    if (q === 'list') {
      const projects: Partial<ProjectType>[] = await prisma.project.findMany({
        select: {
          id: true,
          color: true,
          title: true,
        },
        orderBy: { createdAt: 'desc' },
      })

      return res.status(200).json({ data: projects })
    }

    const projects = await prisma.project.findMany({
      // ...(q &&
      //   q !== 'undefined' &&
      //   q === Status.COMPLETED.toLowerCase() && {
      //     where: {
      //       progressPercentage: {
      //         equals: 100,
      //       },
      //     },
      //   }),

      // ...(q &&
      //   q !== 'undefined' &&
      //   q === Status.INPROGRESS.toLowerCase() && {
      //     where: {
      //       progressPercentage: {
      //         lt: 100,
      //       },
      //     },
      //   }),

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

      orderBy: { createdAt: 'desc' },

      include: {
        tasks: {
          select: {
            status: true,
          },
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
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
