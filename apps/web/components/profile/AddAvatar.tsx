import { useNotification } from '@the-planner/hooks'
import { customFetch, parseImage } from '@the-planner/utils'
import { useUser } from 'apps/web/common/AuthCtx'
import { updateProfile } from 'firebase/auth'
import { ChangeEvent, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Spinner } from '../ui'

export default function AddAvatar() {
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const { setNotification } = useNotification()

  const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const images = await parseImage(e.target.files)

    if (images) {
      try {
        setLoading(true)

        const image = await customFetch('/api/upload-avatar', {
          method: 'POST',
          bodyData: images[0].path,
        })

        if (!image) return

        updateProfile(user, {
          photoURL: image?.data?.path || '',
        })
          .then(() => {
            setLoading(false)
            setNotification({
              message: 'Your avatar has been updated successfully',
              variant: 'success',
            })
          })
          .catch((error) => {
            setLoading(false)
            console.log(error)
            switch (error.code) {
              // case 'auth/invalid-display-name':
              //   setError('displayName', {
              //     type: 'manual',
              //     message: 'Enter your full name',
              //   })
              //   break
              default:
                setNotification({
                  message: 'Something is wrong; try again later.',
                  variant: 'error',
                })
                break
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <label
      htmlFor="upload-avatar"
      className="absolute bottom-0 left-0 z-20 w-full text-center cursor-pointer py-2 flex justify-center items-center"
    >
      {loading ? (
        <Spinner className="[&>path]:fill-base-100" size={24} />
      ) : (
        <FiPlus className="stroke-base-100 z-30" size={24} />
      )}

      <div className="absolute top-0 left-0 bg-black w-full h-full opacity-50 -z-10" />
      {!loading && (
        <input
          id="upload-avatar"
          type="file"
          onChange={uploadHandler}
          accept=".png, .jpg, .jpeg"
          className="hidden"
        />
      )}
    </label>
  )
}
