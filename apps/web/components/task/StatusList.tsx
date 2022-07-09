import { x } from '@xstyled/styled-components'
import { FC } from 'react'
import { Status } from '@the-planner/types'
import { statusAlias } from '@the-planner/utils'
import { RadioButton } from '@the-planner/ui-web'

type Props = {
  status: Status
  onChange: (status: Status) => void
}

const StatusList: FC<Props> = ({ status, onChange }) => {
  return (
    <x.ul my={1} divideY divideColor="layout-level0accent">
      {Object.values(Status).map((val) => (
        <x.li key={Status[val]} display="flex" alignItems="center">
          <RadioButton
            name="status"
            label={statusAlias(Status[val])}
            value={Status[val]}
            id={Status[val]}
            checked={status === Status[val]}
            onChange={() => onChange(Status[val])}
          />
        </x.li>
      ))}
    </x.ul>
  )
}

export default StatusList
