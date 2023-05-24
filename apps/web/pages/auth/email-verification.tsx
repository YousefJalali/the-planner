import { auth } from 'apps/web/config/firebase'
import { applyActionCode } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi'

export default function EmailVerification() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const { oobCode, mode } = router.query

    if (!oobCode || typeof oobCode !== 'string') {
      return
    }

    if (mode === 'verifyEmail' && oobCode) {
      // Verify the email using the oobCode
      applyActionCode(auth, oobCode)
        .then(function () {
          setLoading(false)

          const timer = setTimeout(() => {
            window.location.href = '/profile'
          }, 3000)
          return () => clearTimeout(timer)
        })
        .catch(function (error) {
          setLoading(false)
          setError('An error occurred while verifying the email. Try Again')
        })
    } else {
      setLoading(false)
      setError('Invalid verification link. Try Again')
    }
  }, [router])

  return (
    <main className="min-h-screen flex justify-center items-center">
      {loading ? (
        <div>Verifying your email...</div>
      ) : error ? (
        <div className="text-center">
          <span className="block">{error}</span>
          <Link className="btn btn-primary gap-2 mt-4" href="/profile">
            <FiArrowLeft /> Go back
          </Link>
        </div>
      ) : (
        <div className="prose text-center">
          <FiCheckCircle size={48} className="mx-auto" />
          <h3>Email verified successfully!</h3>
          <p>You will be redirected to your profile page shortly.</p>
          <Link className="btn btn-primary gap-2 mt-4" href="/profile">
            <FiArrowLeft /> Go back
          </Link>
        </div>
      )}
    </main>
  )
}
