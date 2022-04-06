import { x } from '@xstyled/styled-components'
import { FC, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { ProjectType } from '../../common/types/ProjectType'
import Fieldset from '../formElements/Fieldset'
import Icon from '../Icon'
import Modal from '../layout/Modal'
import ProjectItem from '../project/ProjectItem'

type Props = {
  isOpen: boolean
  onRequestClose: () => void
  onItemClick: (id: string) => void
  projects: ProjectType[]
}

const ProjectsListModal: FC<Props> = ({
  isOpen,
  onRequestClose,
  onItemClick,
  projects,
}) => {
  const [search, setSearch] = useState('')

  const onCloseModal = () => {
    setSearch('')
    onRequestClose()
  }

  const onItemClickHandler = (id: string) => {
    setSearch('')
    onItemClick(id)
  }

  const renderList = projects
    ?.filter((p, i, arr) => p.title.includes(search))
    .map((project, i, arr) => (
      <x.li
        key={project.id}
        display='flex'
        alignItems='center'
        p={3}
        onClick={() => onItemClickHandler(project.id)}
      >
        <ProjectItem project={project} />
      </x.li>
    ))

  return (
    <Modal isOpen={isOpen} onRequestClose={onCloseModal}>
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
            <Fieldset>
              <x.input
                type='search'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                backgroundColor='layout-level0'
                // onFocus={() => setFocus(true)}
                // onBlur={() => setFocus(false)}
              />
            </Fieldset>
          </x.li>
        )}

        {renderList.length > 0 ? (
          renderList
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
        >
          <Icon icon={FiPlus} color='brand-primary' size='1.125rem' />
          <x.span text='body' ml={2} color='brand-primary'>
            Create Project
          </x.span>
        </x.li>
      </x.ul>

      {/* {focus && <x.div h={300} />} */}
    </Modal>
  )
}

export default ProjectsListModal
