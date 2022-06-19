import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../common/lib/prisma'
import _ from 'lodash'
import { ProjectType } from '@the-planner/types'
import { deleteImages, deleteWholeProject } from '@the-planner/utils'

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
      include: {
        tasks: {},
      },
    })

    const ids = _.flatten(
      deletedProject.tasks.map((task) =>
        task.attachments.map((attachment) => attachment.id)
      )
    )

    const ha = await deleteWholeProject(deletedProject.id)

    console.log(ha)

    // let i = 0
    // while (i <= ids.length) {
    //   const ha = await deleteImages(_.slice(ids, i, i + 100))

    //   console.log(ha)
    //   i = i + 100
    // }

    // console.log(i)

    res.status(200).json({ data: deletedProject })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export default handler
