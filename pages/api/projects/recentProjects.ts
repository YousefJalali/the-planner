import _ from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ProjectType } from '../../../common/types/ProjectType'
import { prisma } from '../../../common/lib/prisma'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: ProjectType[]
    error?: Error | unknown
  }>
) => {
  try {
    const projects = await prisma.project.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    })

    return res.status(200).json({ data: projects })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export default handler
