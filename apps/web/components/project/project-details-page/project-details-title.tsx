import { memo } from 'react'

export const ProjectTitle = memo(({ title }: { title: string }) => (
  <h1 className="text-4xl font-bold leading-relaxed">{title}</h1>
))

export default ProjectTitle
