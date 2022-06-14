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
      <x.li display="flex" alignItems="center">
        <RadioButton
          name="status"
          label={statusAlias(Status.PROPOSED)}
          value={Status.PROPOSED}
          id={Status.PROPOSED}
          checked={status === Status.PROPOSED}
          onChange={() => onChange(Status.PROPOSED)}
        />
      </x.li>
      <x.li display="flex" alignItems="center">
        <RadioButton
          name="status"
          label={statusAlias(Status.INPROGRESS)}
          value={Status.INPROGRESS}
          id={Status.INPROGRESS}
          checked={status === Status.INPROGRESS}
          onChange={() => onChange(Status.INPROGRESS)}
        />
      </x.li>

      <x.li display="flex" alignItems="center">
        <RadioButton
          name="status"
          label={statusAlias(Status.COMPLETED)}
          value={Status.COMPLETED}
          id={Status.COMPLETED}
          checked={status === Status.COMPLETED}
          onChange={() => onChange(Status.COMPLETED)}
        />
      </x.li>
    </x.ul>
  )
}

export default StatusList
