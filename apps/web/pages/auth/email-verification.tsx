import Link from 'next/link'

export default function EmailVerification() {
  return (
    <div>
      <div>Email Verified</div>
      <Link href="/profile">Go back</Link>
    </div>
  )
}
