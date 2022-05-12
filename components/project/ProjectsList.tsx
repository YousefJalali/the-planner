import { x } from '@xstyled/styled-components'
import { FC, useMemo, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import InfiniteScroll from 'react-infinite-scroll-component'
import useInfiniteProjects from '../../common/data/useInfiniteProjects'
import Fieldset from '../formElements/Fieldset'
import ProjectItem from '../project/ProjectItem'
import Spinner from '../Spinner'

type Props = {
  onSelect: (id: string) => void
  onCreate: () => void
}

const ProjectsList: FC<Props> = ({ onSelect, onCreate }) => {
  const [search, setSearch] = useState('')

  const { projects, isLoading, size, setSize, hasReachedEnd } =
    useInfiniteProjects()

  const onSelectHandler = (id: string) => {
    setSearch('')
    onSelect(id)
  }

  const renderList = useMemo(
    () =>
      projects
        ?.filter((p, i, arr) => p.title.includes(search))
        .map((project, i, arr) => (
          <x.li
            key={project.id}
            display='flex'
            alignItems='center'
            p={3}
            onClick={() => onSelectHandler(project.id)}
          >
            <ProjectItem project={project} />
          </x.li>
        )),
    [projects]
  )

  return (
    <x.ul
      position='relative'
      my={1}
      divideY
      divideColor='layout-level0accent'
      id='project-list-select'
      // pb={focus ? '200px' : 0}
    >
      {projects?.length > 10 && (
        <x.li p={3} position='sticky' top='0'>
          <Fieldset size='small'>
            <x.input
              type='search'
              placeholder='Search...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              backgroundColor='layout-level0'
              boxShadow={2}
              // onFocus={() => setFocus(true)}
              // onBlur={() => setFocus(false)}
            />
          </Fieldset>
        </x.li>
      )}

      {renderList.length > 0 ? (
        <>
          <InfiniteScroll
            dataLength={projects.length}
            next={() => setSize(size + 1)}
            hasMore={!hasReachedEnd}
            loader={
              <x.div display='flex' justifyContent='center' py={3}>
                <Spinner
                  pathColor='brand-primary'
                  trailColor='layout-level0accent'
                />
              </x.div>
            }
          >
            {renderList}
          </InfiniteScroll>
        </>
      ) : (
        <x.li p={3} color='content-nonessential'>
          No project found
        </x.li>
      )}

      <x.li
        display='flex'
        alignItems='center'
        p={3}
        position='sticky'
        bottom='0'
        backgroundColor='layout-level0'
        onClick={onCreate}
      >
        <x.span
          text='body'
          color='brand-primary'
          display='flex'
          alignItems='center'
        >
          <FiPlus />
          <x.span ml={1}>Create Project</x.span>
        </x.span>
      </x.li>
    </x.ul>
  )
}

export default ProjectsList
