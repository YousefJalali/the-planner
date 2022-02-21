import { x } from '@xstyled/styled-components'
import NoTasksSVG from '../../styles/illustrations/NoTasksSVG'
import Button from '../formElements/Button'

const NoTasks = () => {
  return (
    <x.div
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      my={3}
    >
      <x.div w='50%'>
        <NoTasksSVG />
      </x.div>
      <x.p text='body' mt={3}>
        No pending tasks today
      </x.p>
      <x.p text='body.small' color='content-nonessential'>
        Write down some tasks
      </x.p>
      {/* <Button variant='primary'>Add Task</Button> */}
    </x.div>
  )
}

export default NoTasks
