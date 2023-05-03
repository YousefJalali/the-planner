import { FiChevronDown, FiCircle } from 'react-icons/fi'

import { Project } from '@the-planner/types'
import { Spinner } from '@the-planner/ui-web'
import { useProject } from '@the-planner/data'

import SelectButton from './select-project-button'

type Props = {
  onChange: (v: string) => void
  value: string
  placeholder: string
  className?: string
}

export function SelectProject({
  value,
  onChange,
  placeholder,
  className,
}: // taskProject,
Props) {
  const { project, isLoading } = useProject(value)

  const selectHandler = (project: Project) => {
    if (project?.id) {
      onChange(project.id)
    }
  }

  return (
    <SelectButton onSelectProject={selectHandler} className={className}>
      <div className="flex justify-between items-center">
        {project ? (
          <div className="flex items-center">
            {project.color.length > 0 && (
              <>
                <div className="mr-2 flex items-center justify-center">
                  <FiCircle fill={project.color} strokeWidth={0} size={16} />
                </div>
                <span className="leading-normal text-neutral">
                  {project.title}
                </span>
              </>
            )}
          </div>
        ) : (
          <span className="text-neutral opacity-60 leading-normal">
            {placeholder}
          </span>
        )}
        <div className="flex gap-2">
          {value && isLoading && (
            <Spinner
              h={18}
              w={18}
              borderTop={2}
              border={2}
              pathColor="brand-primary"
              trailColor="layout-level0accent"
            />
          )}

          <FiChevronDown size={20} />
        </div>
      </div>
    </SelectButton>
  )
}

export default SelectProject