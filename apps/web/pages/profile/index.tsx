import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiArrowLeft, FiEdit2, FiLogOut } from 'react-icons/fi'
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
  }, [isLoading, user, reset, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (isLoading) {
    return <main className="p-6">Loading...</main>
  }

  return (
    <>
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
        <div className="py-12 lg:max-w-lg">
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="flex w-full flex-col items-center lg:w-1/2">
              <Avatar large />
              {/* <button className="btn-ghost btn-sm btn mt-1 block">
              Edit photo
            </button> */}
            </div>

            <form className="w-full" onSubmit={handleSubmit(submitHandler)}>
              <fieldset disabled={loading} className="space-y-4">
                <div className="form-control w-full">
                  <label className="label px-0 opacity-60">
                    <span className="label-text">Email</span>
                  </label>
                  <span className="input w-full p-0 leading-[3rem]">
                    {user?.email}
                  </span>
                </div>

                <div className="form-control w-full">
                  <label className="label px-0 opacity-60">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    readOnly={!editMode}
                    type="text"
                    // placeholder="johndoe@example.com"
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

                <div className="mt-12 flex space-x-2">
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
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await isAuthenticated(req)

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { user },
  }
}
