import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ProjectType } from '@the-planner/types'
import { prisma } from '../../../../common/lib/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: ProjectType
    error?: Error | unknown
    nextCursor?: string
  }>
) => {
  const projectId = req.query.project

  if (!projectId) {
    return res
      .status(400)
      .json({ error: 'Something went wrong, please try again' })
  }

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId as string,
      },

      include: {
        _count: {
          select: {
            tasks: true,
          },
        },
        tasks: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            project: { select: { title: true, color: true } },
          },
        },
      },
    })

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    return res.status(200).json({ data: project })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export default handler
