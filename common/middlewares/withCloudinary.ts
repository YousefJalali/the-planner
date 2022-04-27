import { v2 as cloudinary } from 'cloudinary'
import { NextApiRequest, NextApiResponse } from 'next'
import { Image } from '@prisma/client'

const withCloudinary = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const {
        hostname: cloud_name,
        username: api_key,
        password: api_secret,
      } = new URL(process.env.CLOUDINARY_URL)

      cloudinary.config({
        cloud_name,
        api_key,
        api_secret,
      })

      return handler(req, res)
    } catch (error) {
      console.log('withCloudinary error:', error)
      return res.status(500).send({ error })
    }
  }
}

export default withCloudinary
