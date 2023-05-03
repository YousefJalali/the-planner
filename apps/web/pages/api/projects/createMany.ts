import type { NextApiRequest, NextApiResponse } from 'next'
import { Project } from '@the-planner/types'
import { prisma } from '../../../common/lib/prisma'
import ObjectID from 'bson-objectid'
import { apiYupValidation } from '@the-planner/hooks'
import { projectFormValidation } from '@the-planner/utils'
import _ from 'lodash'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: object
    error?: Error | unknown
    validationErrors?: any
  }>
) => {
  const projects = req.body

  if (!projects) {
    return res
      .status(400)
      .json({ error: 'Something went wrong, please try again' })
  }

  try {
    // projects.forEach(async (project: Project) => {
    //   //validate form
    //   const validate = await apiYupValidation<Project>(projectFormValidation, project)

    //   if (!_.isEmpty(validate.errors)) {
    //     return res.json({ validationErrors: validate.errors })
    //   }
    // })

    const createdProjects = await prisma.project.createMany({
      data: projects,
    })

    res.json({ data: createdProjects })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

export default handler
