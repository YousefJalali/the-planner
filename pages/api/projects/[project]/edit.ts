import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../common/lib/prisma'
import { apiYupValidation } from '../../../../common/utils/validations/useYupValidationResolver'
import _ from 'lodash'
import {
  ProjectType,
  ProjectWithTasksType,
} from '../../../../common/types/ProjectType'
import projectSchema from '../../../../common/utils/validations/projectSchema'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: ProjectWithTasksType
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
      project = _.omit(projectForm, 'tasks') as ProjectType
    }

    //validate form
    const validate = await apiYupValidation<ProjectType>(projectSchema, project)
    if (!_.isEmpty(validate.errors)) {
      return res.json({ validationErrors: validate.errors })
    }

    //push updated task
    const updatedProject = await prisma.project.update({
      where: { id: project.id },
      data: _.omit(project, 'id'),
      include: {
        tasks: {
          include: { project: { select: { title: true, color: true } } },
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
