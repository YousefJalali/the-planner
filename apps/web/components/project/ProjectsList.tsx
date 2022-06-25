import { x } from '@xstyled/styled-components'
import { FC, useMemo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useProjects } from '@the-planner/data'
import { ProjectType } from '@the-planner/types'
import ProjectItem from '../project/ProjectItem'
import { Spinner, Fieldset } from '@the-planner/ui-web'

type Props = {
  onSelect: (project: ProjectType) => void
  onCreate: () => void
}

const ProjectsList: FC<Props> = ({ onSelect, onCreate }) => {
  const [search, setSearch] = useState('')

  const { projects, error, isLoading } = useProjects('list')

  const onSelectHandler = (project: ProjectType) => {
    setSearch('')
    onSelect(project)
  }

  const renderList = useMemo(
    () =>
      projects
        ?.filter((p, i, arr) => p.title.includes(search))
        .map((project, i, arr) => (
          <x.li
            key={project.id}
            display="flex"
            alignItems="center"
            p={3}
            onClick={() => onSelectHandler(project)}
          >
            <ProjectItem project={project} />
          </x.li>
        )),
    [projects, search]
  )

  return error ? (
    <x.div p={3} display="flex" justifyContent="center">
      {error}
    </x.div>
  ) : isLoading ? (
    <x.div p={4} display="flex" justifyContent="center">
      <Spinner pathColor="brand-primary" trailColor="layout-level0accent" />
    </x.div>
  ) : (
    <x.ul
      position="relative"
      my={1}
      divideY
      divideColor="layout-level0accent"
      id="project-list-select"
    >
      {projects?.length > 10 && (
        <x.li p={3} position="sticky" top="0">
          <Fieldset size="small">
            <x.input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              backgroundColor="layout-level0"
              boxShadow={2}
            />
          </Fieldset>
        </x.li>
      )}

      {renderList.length > 0 ? (
        renderList
      ) : (
        <x.li p={3} color="content-nonessential">
          No project found
        </x.li>
      )}

      <x.li
        display="flex"
        alignItems="center"
        p={3}
        position="sticky"
        bottom="0"
        backgroundColor="layout-level0"
        onClick={onCreate}
      >
        <x.span
          text="body"
          color="brand-primary"
          display="flex"
          alignItems="center"
        >
          <FiPlus />
          <x.span ml={1}>Create Project</x.span>
        </x.span>
      </x.li>
    </x.ul>
  )
}

export default ProjectsList
