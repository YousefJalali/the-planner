import { x } from '@xstyled/styled-components'
import { memo } from 'react'

export const ProjectTitle = memo(({ title }: { title: string }) => (
  <x.h1 text="headline.two" lineHeight="tighter" mb={2}>
    {title}
  </x.h1>
))

export default ProjectTitle
