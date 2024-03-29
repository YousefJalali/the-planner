import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../common/lib/prisma'
import { Project } from '@the-planner/types'
import ObjectID from 'bson-objectid'
import { isAuthenticated } from 'apps/web/config/isAuthenticated'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Project[] | Partial<Project>[] | Project
    error?: Error | unknown
    nextCursor?: string
  }>
) => {
  let user = null
  const uid = await isAuthenticated(req)
  if (uid) {
    user = await prisma.user.findFirst({
      where: { uid },
    })
  }

  if (req.method === 'GET') {
    const { cursor, limit, status, q, projectId } = req.query

    try {
      // Get project by projectId
      if (projectId) {
        if (typeof projectId !== 'string')
          return res.status(404).json({ error: 'project not found' })

        if (!user) return res.status(401).json({ error: 'not authorized' })

        const project = await prisma.project.findFirst({
          where: {
            id: projectId,
            userId: user.id,
          },
          include: {
            tasks: true,
            _count: {
              select: {
                tasks: true,
              },
            },
          },
        })

        if (!project)
          return res.status(404).json({ error: 'project not found' })

        return res.status(200).json({ data: project })
      }

      if (!user) {
        return res.status(200).json({ data: [] })
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

        where: {
          userId: user.id,
          ...(q &&
            q !== 'undefined' &&
            typeof q === 'string' && {
              title: {
                contains: q,
                mode: 'insensitive',
              },
            }),
        },

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
        projects[+(limit || 1) - 1]?.id || projects[projects.length - 1]?.id

      return res
        .status(200)
        .json({ data: projects, ...(limit && { nextCursor }) })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error })
    }
  }

  // Create project
  if (req.method === 'POST') {
    if (!user) {
      return res.status(401).json({ error: 'not authorized' })
    }

    const project = req.body

    if (!project) {
      return res
        .status(400)
        .json({ error: 'Something went wrong, please try again' })
    }

    try {
      //validate form
      // const validate = await apiYupValidation<Project>(projectFormValidation, project)

      // if (!_.isEmpty(validate.errors)) {
      //   return res.json({ validationErrors: validate.errors })
      // }

      let id = project.id
      if (!ObjectID.isValid(id)) {
        console.log('id not valid, new id will be assigned')
        id = ObjectID().toHexString()
      }

      const createdProject = await prisma.project.create({
        data: {
          ...project,
          userId: user.id,
          title: project.title.trim().toLowerCase(),
          id,
        },
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

      res.json({ data: createdProject })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error })
    }
  }

  // update project
  if (req.method === 'PUT') {
    if (!user) {
      return res.status(401).json({ error: 'not authorized' })
    }

    const project: Project = req.body

    if (!project) {
      return res
        .status(400)
        .json({ error: 'Something went wrong, please try again' })
    }

    try {
      //check if task exist in DB
      const existingProject = await prisma.project.findUnique({
        where: { id: project.id },
      })
      if (!existingProject) {
        return res.status(400).json({ error: 'Project not found' })
      }

      //validate form
      // const validate = await apiYupValidation<Project>(projectFormValidation, project)
      // if (!_.isEmpty(validate.errors)) {
      //   return res.json({ validationErrors: validate.errors })
      // }

      //push updated task
      const updatedProject = await prisma.project.update({
        where: { id: project.id },
        data: {
          title: project.title,
          description: project.description,
          color: project.color,
          isHidden: project.isHidden,
        },
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

  if (req.method === 'DELETE') {
    if (!user) {
      return res.status(401).json({ error: 'not authorized' })
    }

    const { projectId } = req.query

    if (!projectId || typeof projectId !== 'string')
      return res.status(400).json({ error: 'unsupported type' })

    try {
      //check if task exist in DB
      const deletedProject = await prisma.project.delete({
        where: { id: projectId },
        include: {
          tasks: {},
        },
      })

      // const ids = _.flatten(
      //   deletedProject.tasks.map((task) =>
      //     task.attachments.map((attachment) => attachment.id)
      //   )
      // )

      // const ha = await deleteWholeProject(deletedProject.id)

      // console.log(ha)

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
}

export default handler
