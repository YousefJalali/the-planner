import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../common/lib/prisma'
import { apiYupValidation } from '@the-planner/hooks'
import _ from 'lodash'
import { Project, ProjectWithTasks } from '@the-planner/types'
import { projectSchema } from '@the-planner/utils'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: ProjectWithTasks
    error?: Error | unknown
    validationErrors?: any
  }>
) => {
  const projectForm = req.body
  if (!projectForm) return

  try {
    //check if task exist in DB
    const existedProject = await prisma.project.findUnique({
      where: { id: projectForm.id },
    })
    if (!existedProject) {
      return res.status(400).json({ error: 'Project not found' })
    }

    let project = projectForm
    //remove project key from task object
    if (projectForm.tasks) {
      project = _.omit(projectForm, 'tasks') as Project
    }

    //validate form
    // const validate = await apiYupValidation<Project>(projectSchema, project)
    // if (!_.isEmpty(validate.errors)) {
    //   return res.json({ validationErrors: validate.errors })
    // }

    //push updated task
    const updatedProject = await prisma.project.update({
      where: { id: project.id },
      data: _.omit(project, 'id'),
      include: {
        tasks: {
          include: { project: { select: { title: true, color: true } } },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
    })

    res.status(200).json({ data: updatedProject })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export default handler
