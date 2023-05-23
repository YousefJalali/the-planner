import Link from 'next/link'
import Avatar from './Avatar'
import { useUser } from 'apps/web/common/AuthCtx'

export default function ProfileButton({ onClick }: { onClick?: () => void }) {
  const { user, isLoading } = useUser()

  return isLoading ? (
    <span className="hidden lg:inline-block">Loading...</span>
  ) : user ? (
    <Link
      href="/profile"
      onClick={onClick}
      className="rounded-xl border overflow-hidden"
    >
      <Avatar />
      <div className="flex flex-col items-start">
        <span className="text-sm font-light">Welcome back,</span>
        <span className="font-semibold first-letter:capitalize">
          {user.displayName?.split(' ')[0] || ''}
        </span>
      </div>
    </Link>
  ) : null
}
