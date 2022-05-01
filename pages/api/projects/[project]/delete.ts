import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../common/lib/prisma'
import _ from 'lodash'
import { ProjectType } from '../../../../common/types/ProjectType'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: ProjectType
    error?: Error | unknown
    validationErrors?: any
  }>
) => {
  const projectId = req.query.project

  if (!projectId || typeof projectId !== 'string') return

  try {
    //check if task exist in DB
    const deletedProject = await prisma.project.delete({
      where: { id: projectId },
    })

    res.status(200).json({ data: deletedProject })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export default handler
