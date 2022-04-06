import { FiArrowLeft, FiLoader, FiPlus } from 'react-icons/fi'
import Header from '../../components/layout/Header'
import ProjectCard from '../../components/project/ProjectCard'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { x } from '@xstyled/styled-components'
import Icon from '../../components/Icon'
import NewProjectCard from '../../components/project/NewProjectCard'
import Modal from '../../components/layout/Modal'
import FormWithHeader from '../../components/FormWithHeader'
import useToggle from '../../common/hooks/useToggle'
import ProjectForm, {
  setFormErrors,
} from '../../components/project/ProjectForm'
import { ProjectType } from '../../common/types/ProjectType'
import { UseFormClearErrors, UseFormSetError } from 'react-hook-form'
import { createProject } from '../../common/actions/projectActions'
import FilterProjects from '../../components/project/FilterProjects'
import { useEffect, useRef, useState } from 'react'
import useInfiniteFetchedProjects from '../../common/data/useFetchedInfiniteProjects'
import { useInView } from 'react-intersection-observer'
import _ from 'lodash'

const Index: NextPage = () => {
  const [createProjectModal, setCreateProjectModal] = useToggle()
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed'>('all')

  const {
    projects,
    setProjects,
    error,
    isLoading,
    size,
    setSize,
    isValidating,
  } = useInfiniteFetchedProjects()

  const router = useRouter()

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (!isLoading && inView) {
      setSize(size + 1)
    }
  }, [inView, isLoading])

  const createProjectHandler = async (
    formData: ProjectType,
    setError: UseFormSetError<ProjectType>,
    clearErrors: UseFormClearErrors<ProjectType>
  ) => {
    //mutate without revalidation
    let oldData: ProjectType[] = []

    setProjects((data) => {
      if (!data) return

      oldData = [..._.compact(data.flat())] || []
      return [...oldData, { ...formData }]
    }, false)

    createProject(
      formData,
      () => {
        setCreateProjectModal()
        setProjects()
      },
      (err) => {
        console.log(err)
        //return old data
        setProjects(oldData)

        if (err.status === 400) {
          if (typeof err.info === 'string') {
            //to be replaced by notification
            prompt(err.info)
          } else {
            setFormErrors(err.info, setError)
          }
        }
      }
    )
  }

  return (
    <main>
      <Header>
        <x.a onClick={() => router.push('/')}>
          <Icon icon={FiArrowLeft} size='1.5rem' />
        </x.a>

        <x.a onClick={setCreateProjectModal}>
          <Icon icon={FiPlus} size='1.5rem' />
        </x.a>
      </Header>
      <x.section overflow='hidden' px={4}>
        <x.h1 text='headline.two' mb={4}>
          Projects
        </x.h1>

        <x.div mb={3}>
          <FilterProjects active={filter} setActive={setFilter} />
        </x.div>

        {isLoading ? (
          <x.div>loading...</x.div>
        ) : projects && projects.length <= 0 ? (
          <NewProjectCard />
        ) : (
          <>
            <x.ul pb={3} spaceY={4}>
              {projects
                .filter((p) =>
                  filter === 'completed'
                    ? p.progressPercentage === 100
                    : filter === 'ongoing'
                    ? p.progressPercentage !== 100
                    : p
                )
                .map((project) => (
                  <x.li key={project.id}>
                    <ProjectCard
                      project={project}
                      onClick={() => router.push(`/projects/${project.id}`)}
                    />
                  </x.li>
                ))}
            </x.ul>
            {isValidating && (
              <x.div display='flex' justifyContent='center'>
                <Icon
                  icon={FiLoader}
                  animation='spin'
                  color='content-nonessential'
                  size='1.5rem'
                />
              </x.div>
            )}
            <x.button visibility='hidden' ref={ref}>
              load more
            </x.button>
          </>
        )}
        {error && (
          <x.div
            position='fixed'
            bottom={24}
            left={0}
            backgroundColor='layout-level0accent'
          >
            error
          </x.div>
        )}
      </x.section>

      <Modal isOpen={createProjectModal} onRequestClose={setCreateProjectModal}>
        <FormWithHeader
          title='Create project'
          onClose={setCreateProjectModal}
          id='create-project-form'
        >
          <ProjectForm
            id='create-project-form'
            onSubmit={createProjectHandler}
          />
        </FormWithHeader>
      </Modal>
    </main>
  )
}

export default Index
