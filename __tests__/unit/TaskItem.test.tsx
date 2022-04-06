import { render, screen, waitFor } from '../../test-utils'
import TaskItem from '../../components/task/TaskItem'
import { Status, TaskType } from '../../common/types/TaskType'
import userEvent from '@testing-library/user-event'

const defaultTask = {
  id: 'test',
  title: 'test task item',
  description: 'task item to be tested',
  project: 'test project',
  openTask: false,
  date: {
    startDate: new Date(),
    endDate: null,
  },
  time: { startTime: null, endTime: null },
  attachments: [],
  status: Status.PROPOSED,
} as TaskType

function setup(task: TaskType = defaultTask) {
  const onCheck: (taskId: string, taskStatus: Status) => void = jest.fn()
  const onDetails: () => void = jest.fn()
  const onOptions: () => void = jest.fn()

  const utils = render(
    <TaskItem
      task={task}
      onCheck={onCheck}
      onDetails={onDetails}
      onOptions={onOptions}
    />
  )

  const checkButton = utils.getByTestId(task.id) as HTMLLabelElement
  const kebabButton = utils.getByTestId(/taskItem-kebab/i) as HTMLAnchorElement
  const detailsButton = utils.getByTestId(
    /taskItem-details/i
  ) as HTMLAnchorElement
  const attachment = utils.queryByTestId(/taskItem-attachment/i)
  const time = utils.queryByTestId(/taskItem-time/i)

  return {
    ...utils,
    checkButton,
    kebabButton,
    detailsButton,
    attachment,
    time,
    onCheck,
    onOptions,
    onDetails,
  }
}

describe('Task item', () => {
  test('render without time and attachments', async () => {
    const task = {
      id: 'test',
      title: 'test task item',
      description: 'task item to be tested',
      project: 'test project',
      openTask: false,
      date: {
        startDate: new Date(),
        endDate: null,
      },
      time: { startTime: null, endTime: null },
      attachments: [],
      status: Status.PROPOSED,
    } as TaskType

    const { time, attachment } = setup(task)

    expect(time).not.toBeInTheDocument()
    expect(attachment).not.toBeInTheDocument()
  })

  test('render with time and without attachments', async () => {
    const task = {
      id: 'test',
      title: 'test task item',
      description: 'task item to be tested',
      project: 'test project',
      openTask: false,
      date: {
        startDate: new Date(),
        endDate: null,
      },
      time: {
        startTime: new Date(),
        endTime: new Date(),
      },
      attachments: [],
      status: Status.PROPOSED,
    } as TaskType

    const { time, attachment } = setup(task)

    expect(time).toBeInTheDocument()
    expect(attachment).not.toBeInTheDocument()
  })

  test('render without time and with attachments', async () => {
    const task = {
      id: 'test',
      title: 'test task item',
      description: 'task item to be tested',
      project: 'test project',
      openTask: false,
      date: {
        startDate: new Date(),
        endDate: null,
      },
      time: {
        startTime: null,
        endTime: null,
      },
      attachments: [{ id: 'img-test', name: 'test', path: 'somewhere' }],
      status: Status.PROPOSED,
    } as TaskType

    const { time, attachment } = setup(task)

    expect(time).not.toBeInTheDocument()
    expect(attachment).toBeInTheDocument()
  })

  test('should call onCheck function one time', () => {
    const { checkButton, onCheck } = setup()

    userEvent.click(checkButton)
    expect(onCheck).toHaveBeenCalledTimes(1)
  })

  test('should call onOptions function one time', () => {
    const { kebabButton, onOptions } = setup()

    userEvent.click(kebabButton)
    expect(onOptions).toHaveBeenCalledTimes(1)
  })

  test('task click should show details modal', async () => {
    const { detailsButton, onDetails } = setup()

    userEvent.click(detailsButton)
    expect(onDetails).toHaveBeenCalledTimes(1)
  })
})
