import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiCircle, FiPlus } from 'react-icons/fi'
import Modal from '../layout/Modal'
import ProjectItem from './ProjectItem'
import { ProjectType } from '../../common/types/ProjectType'
import { x } from '@xstyled/styled-components'
import Icon from '../Icon'
import _ from 'lodash'
import useFetchedProjects from '../../common/data/useFetchedProjects'
import useToggle from '../../common/hooks/useToggle'

type Props = {
  onChange: (v: string) => void
  value: string
  placeholder: string
}

function SelectProject({ value, onChange, placeholder }: Props) {
  const [modal, setModal] = useToggle(false)
  const [project, setProject] = useState<ProjectType>()

  const {
    projects,
    setProjects,
    error: projectsError,
    isLoading: isProjectsLoading,
  } = useFetchedProjects()

  useEffect(() => {
    if (projects) {
      const findProject = projects.find((p) => p.id === value)
      setProject(findProject)
    }
  }, [value, projects])

  const onItemClickHandler = (id: string) => {
    onChange(id)
    setModal()
  }

  return (
    <>
      <x.button
        type='button'
        onClick={setModal}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        backgroundColor='layout-level0'
        borderRadius={2}
      >
        {project ? (
          <x.div display='flex' alignItems='center'>
            {project.color.length > 0 && (
              <>
                <x.div
                  mr={2}
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                >
                  <FiCircle
                    fill={project.color}
                    strokeWidth={0}
                    height={16}
                    width={16}
                  />
                </x.div>
                <x.span color='content-contrast' lineHeight='normal'>
                  {project.title}
                </x.span>
              </>
            )}
          </x.div>
        ) : (
          <x.span color='content-nonessential' lineHeight='normal'>
            {placeholder}
          </x.span>
        )}
        <Icon icon={FiChevronDown} size='1rem' color='content-subtle' />
      </x.button>

      <Modal isOpen={modal} onRequestClose={setModal}>
        <x.ul py={2}>
          {projects?.map((project) => (
            <x.li key={project.id} px={3} py={2}>
              <ProjectItem
                project={project}
                onClick={() => onItemClickHandler(project.id)}
              />
            </x.li>
          ))}

          <x.hr w='100%' borderColor='layout-divider' borderWidth={1} my={1} />

          <x.li
            display='flex'
            alignItems='center'
            color='brand-primary'
            px={3}
            py={1}
          >
            <FiPlus />
            <x.span text='body' ml={2}>
              Create Project
            </x.span>
          </x.li>
        </x.ul>
      </Modal>
    </>
  )
}

export default SelectProject
// import React, { useState } from 'react'
// import { ChevronDown, Circle, Plus } from 'lucide-react'
// import { Box, Text } from '../../styles'
// import Select from '../../styles/components/project/SelectProjectStyle'
// import Label from '../../styles/components/LabelStyle'
// import List from '../../styles/components/ListStyle'
// import Modal from '../layout/Modal'
// import ProjectItem from './ProjectItem'
// import { useController, UseControllerProps } from 'react-hook-form'
// import ProjectType from '../../common/types/ProjectType'
// import useSWR from 'swr'

// type Props<T> = {} & UseControllerProps<T>

// const getProjects = async () => {
//   const res = await fetch('/projects')
//   const data: ProjectType[] = await res.json()
//   return data
// }

// function SelectProject<T extends Record<string, any> = Record<string, any>>(
//   props: Props<T>
// ) {
//   const [modal, setModal] = useState(false)

//   const { data: projects, error: projectError } = useSWR(
//     '/projects',
//     getProjects
//   )

//   const openModalHandler = () => setModal(true)
//   const closeModalHandler = () => setModal(false)

//   const {
//     field: { onChange, value, name },
//     fieldState: { error },
//   } = useController(props)

//   const onItemClickHandler = (project: ProjectType) => {
//     onChange({
//       id: project.id,
//       title: project.title,
//       color: project.color,
//     })
//     closeModalHandler()
//   }

//   return (
//     <>
//       <fieldset>
//         <Label>Project</Label>
//         <Select type='button' onClick={openModalHandler}>
//           <Box display='flex' alignItems='center'>
//             {value.color.length > 0 && (
//               <Box
//                 mr={1}
//                 display='flex'
//                 alignItems='center'
//                 justifyContent='center'
//               >
//                 <Circle
//                   fill={value.color}
//                   strokeWidth={0}
//                   height={16}
//                   width={16}
//                 />
//               </Box>
//             )}
//             <Text
//               as='span'
//               fontSize={1}
//               lineHeight={0}
//               color='content.nonessential'
//             >
//               {value.title.length > 0 ? (
//                 <Text as='span' color='content.contrast'>
//                   {value.title}
//                 </Text>
//               ) : (
//                 'Select a project'
//               )}
//             </Text>
//           </Box>
//           <ChevronDown height={16} width={16} />
//         </Select>
//       </fieldset>

//       {modal && (
//         <Modal title='' onClose={closeModalHandler}>
//           <List.UL py={1} mb={1}>
//             {projects?.map((project) => (
//               <ProjectItem
//                 key={project.id}
//                 project={project}
//                 onClick={() => onItemClickHandler(project)}
//               />
//             ))}
//             <hr />
//             <List.LI
//               as='li'
//               display='flex'
//               alignItems='center'
//               px={3}
//               mt={1}
//               color='brand.primary'
//             >
//               <Plus />
//               <Text as='span' ml={1}>
//                 Create Project
//               </Text>
//             </List.LI>
//           </List.UL>
//         </Modal>
//       )}
//     </>
//   )
// }

// export default SelectProject
