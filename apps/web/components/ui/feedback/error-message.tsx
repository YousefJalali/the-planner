import Link from 'next/link'
import { ErrorSvg } from '../'

export const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="w-full px-3 flex flex-col items-center">
      <div className="w-1/2 flex items-center mb-6 max-w-sm">
        <ErrorSvg />
      </div>

      <p className="text-xl">Oops! Something went wrong!</p>
      <p className="opacity-60">{error}</p>

      <Link href="/" className="btn btn-primary mt-6">
        go back
      </Link>
    </div>
  )
}

export default ErrorMessage
