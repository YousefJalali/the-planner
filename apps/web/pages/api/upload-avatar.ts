import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../common/lib/prisma'
import { Attachment } from '@the-planner/types'
import { isAuthenticated } from 'apps/web/config/isAuthenticated'
import { uploadImage } from '@the-planner/utils'
import { v2 as cloudinary } from 'cloudinary'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data?: Attachment
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

  // Upload avatar
  if (req.method === 'POST') {
    if (!user) {
      return res.status(401).json({ error: 'not authorized' })
    }

    const path: string = req.body

    try {
      const image = await uploadImage(path, 'users', cloudinary.uploader.upload)

      res.json({ data: image })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error })
    }
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
}

export default handler
