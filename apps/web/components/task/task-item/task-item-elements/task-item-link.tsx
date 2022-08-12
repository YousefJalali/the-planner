import { TaskWithProjectType } from '@the-planner/types'
import { x } from '@xstyled/styled-components'
import { useTaskDetailsModal } from 'apps/web/components/modals'
import { memo, useMemo } from 'react'

type Props = {
  task: TaskWithProjectType
}

export const Link = ({ task }: Props) => {
  const { showModal } = useTaskDetailsModal(task)

  return useMemo(
    () => (
      <x.a
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        onClick={showModal}
        userSelect="none"
        cursor="pointer"
      />
    ),
    [showModal]
  )
}

export default Link
