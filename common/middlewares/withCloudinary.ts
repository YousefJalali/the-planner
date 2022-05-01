import { v2 as cloudinary } from 'cloudinary'
import { NextApiRequest, NextApiResponse } from 'next'

const withCloudinary = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const {
        hostname: cloud_name,
        username: api_key,
        password: api_secret,
      } = new URL(process.env.CLOUDINARY_URL as string)

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
