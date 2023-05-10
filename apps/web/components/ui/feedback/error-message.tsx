import { ErrorSvg } from '../'

export const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <div className="w-full px-3 flex flex-col items-center">
      <div className="w-1/2 flex items-center mb-6">
        <ErrorSvg />
      </div>

      <p className="text-xl">Oops! Something went wrong!</p>
      <p className="opacity-60">{error}</p>

      <button className="btn btn-primary mt-6" name="go back">
        go back
      </button>
    </div>
  )
}

export default ErrorMessage
