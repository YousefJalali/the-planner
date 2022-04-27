import type { NextApiRequest, NextApiResponse } from 'next'
import { ProjectType } from '../../../common/types/ProjectType'
import { prisma } from '../../../common/lib/prisma'
import ObjectID from 'bson-objectid'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data?: ProjectType; error?: Error | unknown }>
) => {
  const project = req.body

  if (!project) {
    return res
      .status(400)
      .json({ error: 'Something went wrong, please try again' })
  }

  try {
    const createdProject = await prisma.project.create({
      data: {
        ...project,
        id: ObjectID().toHexString(),
      },
    })

    res.json({ data: createdProject })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

export default handler
