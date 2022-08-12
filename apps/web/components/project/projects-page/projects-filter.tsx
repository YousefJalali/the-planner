import { FilterType, Status } from '@the-planner/types'
import { Filter } from '@the-planner/ui-web'
import { statusAlias } from '@the-planner/utils'

export const FILTERS: FilterType[] = [
  { alias: 'All', value: '' },
  { alias: statusAlias(Status.COMPLETED), value: Status.COMPLETED },
  { alias: statusAlias(Status.INPROGRESS), value: Status.INPROGRESS },
]

type Props = {
  filter: FilterType
  setFilter: (filter: FilterType) => void
}

const ProjectsFilter = ({ filter, setFilter }: Props) => {
  const filterHandler = (filter: FilterType) => {
    setFilter(filter)

    const query = `/?q=${filter.alias}`
    window.history.replaceState(
      { ...window.history.state, as: query, url: query },
      '',
      query
    )
  }

  return <Filter active={filter} setActive={filterHandler} items={FILTERS} />
}

export default ProjectsFilter
