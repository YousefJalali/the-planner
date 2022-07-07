import { x } from '@xstyled/styled-components'
import { FC, useMemo, useState } from 'react'
import { FiPlus, FiSearch } from 'react-icons/fi'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

import { useProjects } from '@the-planner/data'
import { ProjectType } from '@the-planner/types'
import { Spinner, Fieldset } from '@the-planner/ui-web'
import { useWindowSize } from '@the-planner/hooks'

import ProjectItem from '../project/ProjectItem'

type Props = {
  onSelect: (project: ProjectType) => void
  onCreate: () => void
}

const ProjectsList: FC<Props> = ({ onSelect, onCreate }) => {
  const [search, setSearch] = useState('')
  const { height } = useWindowSize()

  const { projects, error, isLoading } = useProjects('list')

  const onSelectHandler = (project: ProjectType) => {
    setSearch('')
    onSelect(project)
  }

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
      <AutoSizer>
        {({ height, width }) => {
          return (
            <List
              innerElementType="ul"
              itemData={data}
              itemCount={data.length}
              itemSize={58}
              height={height}
              width={width}
            >
              {({ data, index, style }) => {
                return (
                  <x.li
                    key={data[index].id}
                    display="flex"
                    alignItems="center"
                    p={3}
                    onClick={() => onSelectHandler(data[index])}
                    style={style}
                    borderBottom="1px solid"
                    borderColor="layout-level0accent"
                  >
                    <ProjectItem project={data[index]} />
                  </x.li>
                )
              }}
            </List>
          )
        }}
      </AutoSizer>
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
        <x.div p={3} position="sticky" top="0" zIndex="1000">
          <Fieldset>
            <x.input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              backgroundColor="layout-level0"
              boxShadow={2}
            />
          </Fieldset>
        </x.div>
      )}

      <x.div h="100%" minHeight={height ? height / 2 : 300} flex="1 1 auto">
        {renderList}
      </x.div>

      <x.div
        display="flex"
        alignItems="center"
        p={3}
        position="sticky"
        bottom="0"
        backgroundColor="layout-level0"
        onClick={onCreate}
        borderTop="1px solid"
        borderColor="layout-level0accent"
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
      </x.div>
    </x.div>
  )
}

export default ProjectsList
