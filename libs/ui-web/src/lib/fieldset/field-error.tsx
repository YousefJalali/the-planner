import styled, { x } from '@xstyled/styled-components'
import * as _ from 'lodash'
import { FieldError as FieldErrorProps } from 'react-hook-form'
import { SupportiveText } from './supportive-text'

export const FieldErrorMessage = styled(SupportiveText)<{ error?: boolean }>`
  color: utility-critical;
`

export const FieldError = ({
  error,
}: {
  error: FieldErrorProps | FieldErrorProps[] | undefined
}) => {
  return (
    <>
      {_.isArray(error) ? (
        error.length > 0 && (
          <x.ul>
            {error.map((err, i) => (
              <li key={i}>
                <FieldErrorMessage>• {err.message}</FieldErrorMessage>
              </li>
            ))}
          </x.ul>
        )
      ) : _.isObject(error) && !(error instanceof Array) ? (
        <FieldErrorMessage>{error.message}</FieldErrorMessage>
      ) : null}
    </>
  )
}

export default FieldError
