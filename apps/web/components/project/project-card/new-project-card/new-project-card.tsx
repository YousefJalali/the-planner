import { x } from '@xstyled/styled-components'
import { NoProjectSvg } from '@the-planner/ui-web'
import NewProject from './create-button'

export const NewProjectCard = () => {
  return (
    <x.div
      position="relative"
      display="flex"
      justifyContent="space-between"
      overflow="hidden"
      backgroundColor="layout-level0accent"
      p={3}
      borderRadius={3}
      minHeight={150}
    >
      <x.div
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <x.div mb={4}>
          <x.span
            color="content-contrast"
            text="body.large"
            fontWeight="medium"
            display="block"
          >
            No active projects
          </x.span>
          <x.span color="content-default" text="body.small">
            Create your first project now
          </x.span>
        </x.div>

        <NewProject />
      </x.div>

      <x.div
        position="absolute"
        top="70%"
        right="-50%"
        transform
        translateY="-50%"
        rotate={36}
        w="120%"
        h="120%"
      >
        <NoProjectSvg />
      </x.div>
    </x.div>
  )
}

export default NewProjectCard
