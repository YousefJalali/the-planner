import { ChangeEvent, FC, useMemo, useState, useCallback } from 'react'

import { useProjects } from '@the-planner/data'
import { Project } from '@the-planner/types'
import { FlatList } from '@the-planner/ui-web'
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
      return <div className="p-3 opacity-60 text-center">No project found</div>
    }

    return (
      <FlatList<Project> data={data} itemHeight={58}>
        {(item) => (
          <button
            className="px-3 h-full w-full border-b hover:bg-base-200"
            onClick={() => selectHandler(item)}
            data-testid="projects-list-item"
          >
            <ProjectItem project={item} />
          </button>
        )}
      </FlatList>
    )
  }, [projects, search])

  return error ? (
    <div className="p-6">{error}</div>
  ) : isLoading ? (
    <span className="block p-6 text-center">Loading...</span>
  ) : (
    <div className="relative" id="project-list-select">
      {projects?.length > 10 && (
        <Search value={search} onChange={searchHandler} />
      )}

      <div
        className="relative h-full mx-3 overflow-y-scroll"
        style={{ minHeight: height ? height * 0.7 : 300 }}
      >
        {renderList}

        <CreateProjectButton onSelectProject={onSelectProject} />
      </div>
    </div>
  )
}

export default ProjectsList
