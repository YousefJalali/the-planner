import { mockNextUseRouter, render } from '../../../../test-utils'
import { TaskWithProject } from '@the-planner/types'
import { TaskOptionsList } from '../task-options-list'
import { taskSample } from './task-sample'

mockNextUseRouter({
  route: '/',
  pathname: '/project',
  query: 'projectId',
  asPath: 'projectId',
})
mockNextUseRouter({
  route: '/',
  pathname: '/',
  query: 'taskId',
  asPath: 'taskId',
})

function setup(task: TaskWithProject = taskSample) {
  const utils = render(<TaskOptionsList task={taskSample} />)

  const list = utils.getAllByTestId(/-option/i) as HTMLUListElement[]

  const changeStatusOption = utils.getByTestId(
    'change-status-option'
  ) as HTMLLIElement
  const editTaskOption = utils.getByTestId('edit-task-option') as HTMLLIElement
  const deleteTaskOption = utils.getByTestId(
    'delete-task-option'
  ) as HTMLLIElement

  return {
    ...utils,
    list,
    changeStatusOption,
    editTaskOption,
    deleteTaskOption,
  }
}

describe('Task Options List', () => {
  test('status list render properly', () => {
    const { list } = setup()

    expect(list).toHaveLength(3)
  })
})
