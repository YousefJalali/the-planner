import type { NextApiRequest, NextApiResponse } from 'next'
import { TaskType } from '../../../../common/types/TaskType'
import { prisma } from '../../../../common/lib/prisma'
import { apiYupValidation } from '../../../../common/utils/validations/useYupValidationResolver'
import taskSchema from '../../../../common/utils/validations/taskSchema'
import _ from 'lodash'
import { FieldErrors } from 'react-hook-form'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: TaskType
    error?: Error | unknown
    validationErrors?: any
  }>
) => {
  const taskForm = req.body
  if (!taskForm) return

  //check if task exist in DB
  const existedTask = await prisma.task.findUnique({
    where: { id: taskForm.id },
  })
  if (!existedTask) {
    return res.status(400).json({ error: 'Task not found' })
  }

  //remove project key from task object
  const task = _.omit(taskForm, 'project') as TaskType

  try {
    //validate form
    const validate = await apiYupValidation<TaskType>(taskSchema, task)
    if (!_.isEmpty(validate.errors)) {
      return res.json({ validationErrors: validate.errors })
    }

    //check if project exist in DB
    const project = await prisma.project.findUnique({
      where: {
        id: task.projectId,
      },
    })
    if (!project) {
      return res.json({
        validationErrors: {
          projectId: {
            type: 'required',
            message: 'Cannot find the selected project',
          } as FieldErrors<TaskType>,
        },
      })
    }

    //push updated task
    const updatedTask = await prisma.task.update({
      where: { id: task.id },
      data: _.omit(task, 'id'),
      include: { project: { select: { title: true, color: true } } },
    })

    res.status(200).json({ data: updatedTask })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export default handler
