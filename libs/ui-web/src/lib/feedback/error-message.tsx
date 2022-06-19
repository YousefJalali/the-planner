import { x } from '@xstyled/styled-components'
import { ErrorSvg } from '../illustration/'
import { Button } from '../button/button'

export const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <x.div
      w="100%"
      px={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <x.div w="50%" display="flex" alignItems="center" mb={3}>
        <ErrorSvg />
      </x.div>

      <x.p text="body.large">Oops! Something went wrong!</x.p>
      <x.p text="body.small" color="content-subtle">
        {error}
      </x.p>

      <Button name="go back" mt={2}>
        go back
      </Button>
    </x.div>
  )
}

export default ErrorMessage
