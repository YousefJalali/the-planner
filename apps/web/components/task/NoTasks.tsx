import { x } from '@xstyled/styled-components'
import NoTasksSVG from '../../styles/illustrations/NoTask'

const NoTask = () => {
  return (
    <x.div
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      my={5}
    >
      <x.div w='50%'>
        <NoTasksSVG />
      </x.div>
      <x.p text='body' mt={3} color='content-contrast'>
        No pending tasks today
      </x.p>
      <x.p text='body.small' color='content-subtle'>
        Write down some tasks
      </x.p>
      {/* <Button variant='primary'>Add Task</Button> */}
    </x.div>
  )
}

export default NoTask
