import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FiArrowLeft,
  FiCheckCircle,
  FiCircle,
  FiEdit2,
  FiLogOut,
} from 'react-icons/fi'
import { updateProfile } from 'firebase/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import Head from 'next/head'
import { useNotification } from '@the-planner/hooks'
import { useUser } from 'apps/web/common/AuthCtx'
import { updateProfileValidation } from '@the-planner/utils'
import { logout } from '@the-planner/data'
import Avatar from 'apps/web/components/profile/Avatar'
import { isAuthenticated } from 'apps/web/config/isAuthenticated'
import { UpdateProfile } from '@the-planner/types'
import Link from 'next/link'
import VerifyEmail from 'apps/web/components/auth/VerifyEmail'
import AddAvatar from 'apps/web/components/profile/AddAvatar'

export default function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const router = useRouter()
  const { user, isLoading } = useUser()
  const { setNotification } = useNotification()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset,
  } = useForm({
    defaultValues: { displayName: '' },
    resolver: yupResolver(updateProfileValidation),
  })

  const submitHandler = async (data: UpdateProfile) => {
    setLoading(true)

    updateProfile(user, data)
      .then(() => {
        setLoading(false)
        setNotification({
          message: 'Your profile has been updated successfully',
          variant: 'success',
        })
        setEditMode(false)
      })
      .catch((error) => {
        setLoading(false)
        switch (error.code) {
          case 'auth/invalid-display-name':
            setError('displayName', {
              type: 'manual',
              message: 'Enter your full name',
            })
            break

          default:
            setNotification({
              message: 'Something is wrong; try again later.',
              variant: 'error',
            })
            break
        }
      })
  }

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        reset({ displayName: user.displayName })
      } else {
        router.push('/auth/login')
      }
    }
  }, [isLoading, user, reset])

  const handleLogout = async () => {
    router.push('/')
    await logout()
  }

  if (isLoading) {
    return <main className="p-6 min-h-screen">Loading...</main>
  }

  const progress: number =
    50 + ((user?.emailVerified && 25) || 0) + ((user?.photoURL && 25) || 0)

  return (
    <div className="min-h-screen">
      <Head>
        <title>Profile | VRBTM</title>
      </Head>

      <header className="flex justify-between items-center px-6 py-3 lg:p-6 bg-base-100">
        <Link href="/" className="btn btn-ghost btn-circle -ml-4 lg:hidden">
          <FiArrowLeft size={24} />
        </Link>

        <h1 className="text-4xl font-bold hidden lg:inline-block">Profile</h1>
      </header>

      <main className="px-6 min-h-screen bg-base-100">
        <h1 className="text-3xl font-bold mb-4 lg:hidden">Profile</h1>
        <div className="py-12">
          <div className="flex flex-col gap-16 lg:flex-row">
            <div className="flex flex-col items-center flex-1">
              <div className="relative w-fit h-fit flex">
                <div
                  className="radial-progress text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%+32px)] h-[calc(100%+32px)] z-10 after:opacity-0"
                  //@ts-ignore
                  style={{ '--value': progress }}
                ></div>
                <div className="relative flex overflow-hidden rounded-full">
                  <Avatar large />
                  <AddAvatar />
                </div>
              </div>

              <div className="text-center mt-10 leading-relaxed">
                <span className="block text-lg">
                  Your profile is <b>{progress}%</b> completed.
                </span>

                <ul className="w-fit mx-auto flex flex-col items-center my-2 space-y-1">
                  {[
                    {
                      cond: user?.emailVerified,
                      text: 'Verify your email',
                      tooltip: 'Verify your email',
                    },
                    {
                      cond: user?.photoURL,
                      text: 'Add an avatar',
                      tooltip: 'Upload your photo',
                    },
                  ].map(({ text, cond, tooltip }) => (
                    <li
                      key={text}
                      className={`${cond ? 'text-primary line-through' : ''}`}
                    >
                      <div
                        className="tooltip flex gap-1 items-center"
                        data-tip={tooltip}
                      >
                        {cond ? <FiCheckCircle /> : <FiCircle />}
                        {text}
                      </div>
                    </li>
                  ))}
                </ul>
                <span className="opacity-60 text-sm max-w-sm block">
                  Unlock your profile's true potential and embark on a
                  personalized journey.
                </span>
              </div>
            </div>

            <form className="flex-1" onSubmit={handleSubmit(submitHandler)}>
              <fieldset disabled={loading} className="space-y-6">
                <div className="form-control w-full">
                  <label className="label px-0 opacity-60">
                    <span className="label-text">
                      Email
                      <div
                        className={`badge ml-2 ${
                          user?.emailVerified ? 'badge-success' : 'badge-error'
                        }`}
                      >
                        {user?.emailVerified ? 'Verified' : 'Unverified'}
                      </div>
                    </span>
                  </label>
                  <span className="input w-full p-0 leading-[3rem]">
                    {user?.email}
                  </span>
                  {!user?.emailVerified && (
                    <label className="label">
                      <span className="label-text-alt">
                        <VerifyEmail />
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control w-full max-w-sm">
                  <label className="label px-0 opacity-60">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    readOnly={!editMode}
                    type="text"
                    className={`input-bordered input w-full read-only:border-0 read-only:p-0 read-only:focus:ring-0 ${
                      errors?.displayName?.message ? 'input-error' : ''
                    }`}
                    {...register('displayName')}
                  />

                  <label
                    className={`label ${
                      !errors?.displayName?.message ? 'hidden' : ''
                    }`}
                  >
                    <span className="label-text-alt text-error">
                      {errors?.displayName?.message}
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex space-x-2">
                  {!editMode ? (
                    <>
                      <button
                        type="button"
                        className="btn-primary btn w-full flex-1 gap-2 lg:w-fit lg:flex-initial"
                        onClick={() => setEditMode(true)}
                      >
                        <FiEdit2 />
                        edit
                      </button>
                      <button
                        type="button"
                        className="btn-outline btn-error btn gap-2"
                        onClick={handleLogout}
                      >
                        <FiLogOut />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn-ghost btn"
                        onClick={() => {
                          setEditMode(false)
                          reset({ displayName: user.displayName })
                        }}
                      >
                        cancel
                      </button>
                      <button
                        type="submit"
                        className={`btn-primary btn ${
                          loading ? 'loading' : ''
                        }`}
                        disabled={watch('displayName') === user?.displayName}
                      >
                        save
                      </button>
                    </>
                  )}
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await isAuthenticated(req)

  if (!user) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
}
