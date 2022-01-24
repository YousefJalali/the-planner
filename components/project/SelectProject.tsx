import React, { useState } from 'react'
import { ChevronDown, Circle, Plus } from 'lucide-react'
import { Box, Text } from '../../styles'
import Select from '../../styles/components/project/SelectProjectStyle'
import Label from '../../styles/components/LabelStyle'
import List from '../../styles/components/ListStyle'
import Modal from '../layout/Modal'
import ProjectItem from './ProjectItem'
import { useController, UseControllerProps } from 'react-hook-form'
import ProjectType from '../../common/types/ProjectType'
import useSWR from 'swr'

type Props<T> = {} & UseControllerProps<T>

const getProjects = async () => {
  const res = await fetch('/projects')
  const data: ProjectType[] = await res.json()
  return data
}

function SelectProject<T extends Record<string, any> = Record<string, any>>(
  props: Props<T>
) {
  const [modal, setModal] = useState(false)

  const { data: projects, error: projectError } = useSWR(
    '/projects',
    getProjects
  )

  const openModalHandler = () => setModal(true)
  const closeModalHandler = () => setModal(false)

  const {
    field: { onChange, value, name },
    fieldState: { error },
  } = useController(props)

  const onItemClickHandler = (project: ProjectType) => {
    onChange({
      id: project.id,
      title: project.title,
      color: project.color,
    })
    closeModalHandler()
  }

  return (
    <>
      <fieldset>
        <Label>Project</Label>
        <Select type='button' onClick={openModalHandler}>
          <Box display='flex' alignItems='center'>
            {value.color.length > 0 && (
              <Box
                mr={1}
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                <Circle
                  fill={value.color}
                  strokeWidth={0}
                  height={16}
                  width={16}
                />
              </Box>
            )}
            <Text
              as='span'
              fontSize={1}
              lineHeight={0}
              color='content.nonessential'
            >
              {value.title.length > 0 ? (
                <Text as='span' color='content.contrast'>
                  {value.title}
                </Text>
              ) : (
                'Select a project'
              )}
            </Text>
          </Box>
          <ChevronDown height={16} width={16} />
        </Select>
      </fieldset>

      {modal && (
        <Modal title='' onClose={closeModalHandler}>
          <List.UL py={1} mb={1}>
            {projects?.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
                onClick={() => onItemClickHandler(project)}
              />
            ))}
            <hr />
            <List.LI
              as='li'
              display='flex'
              alignItems='center'
              px={3}
              mt={1}
              color='brand.primary'
            >
              <Plus />
              <Text as='span' ml={1}>
                Create Project
              </Text>
            </List.LI>
          </List.UL>
        </Modal>
      )}
    </>
  )
}

export default SelectProject
