import { x } from '@xstyled/styled-components'
import { ChangeEvent, FC, useMemo, useState, useCallback } from 'react'

import { useProjects } from '@the-planner/data'
import { Project } from '@the-planner/types'
import { Spinner, FlatList } from '@the-planner/ui-web'
import { useWindowSize } from '@the-planner/hooks'

import ProjectItem from '../ProjectItem'
import Search from './projects-list-search'
import CreateProjectButton from './projects-list-create'

type Props = {
  onSelectProject: (project: Project) => void
}

export const ProjectsList: FC<Props> = ({ onSelectProject }) => {
  const [search, setSearch] = useState('')
  const { height } = useWindowSize()

  const { projects, error, isLoading } = useProjects('list')

  const selectHandler = (project: Project) => {
    setSearch('')
    onSelectProject(project)
  }

  const searchHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [projects]
  )

  const renderList = useMemo(() => {
    const data = projects.filter((p, i, arr) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )

    if (data.length <= 0) {
      return (
        <x.div p={3} color="content-nonessential" textAlign="center">
          No project found
        </x.div>
      )
    }

    return (
      <FlatList<Project> data={data} itemHeight={58}>
        {(item) => (
          <x.a
            display="block"
            p={3}
            onClick={() => selectHandler(item)}
            data-testid="projects-list-item"
          >
            <ProjectItem project={item} />
          </x.a>
        )}
      </FlatList>
    )
  }, [projects, search])

  return error ? (
    <x.div p={3} display="flex" justifyContent="center">
      {error}
    </x.div>
  ) : isLoading ? (
    <x.div p={4} display="flex" justifyContent="center">
      <Spinner pathColor="brand-primary" trailColor="layout-level0accent" />
    </x.div>
  ) : (
    <x.div position="relative" my={1} id="project-list-select">
      {projects?.length > 10 && (
        <Search value={search} onChange={searchHandler} />
      )}

      <x.div
        position="relative"
        h="100%"
        minHeight={height ? height * 0.7 : 300}
      >
        {renderList}
      </x.div>

      <CreateProjectButton onSelectProject={onSelectProject} />
    </x.div>
  )
}

export default ProjectsList
