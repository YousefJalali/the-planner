import { useNotification } from '@the-planner/hooks'
import { auth } from 'apps/web/config/firebase'
import { sendEmailVerification } from 'firebase/auth'
import { useState } from 'react'

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { setNotification } = useNotification()

  const submitHandler = async () => {
    if (!auth.currentUser) return
    setLoading(true)

    sendEmailVerification(auth.currentUser)
      .then(() => {
        setSuccess(true)
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/missing-email':
            setError('Enter your email')
            break
          case 'auth/invalid-email':
            setError('Invalid email!')
            break
          case 'auth/user-not-found':
            setError('Email not found!')
            break

          default:
            setNotification({
              message: 'Something is wrong; try again later.',
              variant: 'error',
            })
            break
        }
      })
    setLoading(false)
  }

  return loading ? (
    <span>Sending Email...</span>
  ) : error ? (
    <span>{error}</span>
  ) : success ? (
    <>
      <span className="text-primary block">
        An email has been sent to your address. <br />
        <span className="text-neutral">
          If you do not see it in your inbox, please check your spam folder.
        </span>
      </span>
    </>
  ) : (
    <a onClick={submitHandler} className="link link-hover link-primary">
      Click here to verify your email
    </a>
  )
}
