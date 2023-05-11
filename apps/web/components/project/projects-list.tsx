import { ChangeEvent, FC, useMemo, useState, useCallback } from 'react'

import { useProjects } from '@the-planner/data'
import { Project } from '@the-planner/types'
import { useWindowSize } from '@the-planner/hooks'

import { FlatList } from '../ui'
import CreateProject from './create-project'
import { FiCircle } from 'react-icons/fi'

type Props = {
  onSelectProject: (project: Project) => void
}

export const ProjectsList: FC<Props> = ({ onSelectProject }) => {
  const [search, setSearch] = useState('')
  const { height } = useWindowSize()

  const { projects, error, isLoading } = useProjects({})

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
            <span className="flex items-center gap-2">
              <FiCircle fill={item.color} strokeWidth={0} />
              {item.title}
            </span>
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
    <div id="project-list-select">
      <div className="relative flex mx-3 mt-12 pb-2 gap-x-2">
        <div className="sticky top-0 z-50 flex-1">
          <input
            type="search"
            name="keyword"
            placeholder="Search..."
            autoComplete="off"
            className="input input-bordered w-full"
            value={search}
            onChange={searchHandler}
          />
        </div>

        <CreateProject />
        {/* <CreateProjectButton onSelectProject={onSelectProject} /> */}
      </div>

      <div
        className="relative h-full mx-3 overflow-y-scroll"
        style={{ minHeight: height ? height * 0.7 : 300 }}
      >
        {renderList}
      </div>
    </div>
  )
}

export default ProjectsList
