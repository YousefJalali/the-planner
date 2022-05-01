import { render, screen, waitFor } from '../../test-utils'
import TaskItem from '../../components/task/TaskItem'
import {
  Status,
  TaskType,
  TaskWithProjectType,
} from '../../common/types/TaskType'
import userEvent from '@testing-library/user-event'

const defaultTask = {
  id: 'test',
  title: 'test task item',
  description: 'task item to be tested',
  projectId: 'test project',
  openTask: false,
  startDate: new Date(),
  endDate: null,
  startTime: null,
  endTime: null,
  attachments: [],
  status: Status.PROPOSED,
  project: {
    title: 'project-test',
    color: '#000000',
  },
} as TaskWithProjectType

function setup(task: TaskWithProjectType = defaultTask) {
  const onCheck: (task: TaskWithProjectType) => void = jest.fn()
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
    const task: TaskWithProjectType = {
      id: 'test',
      title: 'test task item',
      description: 'task item to be tested',
      projectId: 'test project',
      openTask: false,
      startDate: new Date(),
      endDate: null,
      startTime: null,
      endTime: null,
      attachments: [],
      status: Status.PROPOSED,
      project: {
        title: 'project-test',
        color: '#000000',
      },
    }

    const { time, attachment } = setup(task)

    expect(time).not.toBeInTheDocument()
    expect(attachment).not.toBeInTheDocument()
  })

  test('render with time and without attachments', async () => {
    const task: TaskWithProjectType = {
      id: 'test',
      title: 'test task item',
      description: 'task item to be tested',
      projectId: 'test project',
      openTask: false,
      startDate: new Date(),
      endDate: null,
      startTime: new Date(),
      endTime: new Date(),

      attachments: [],
      status: Status.PROPOSED,
      project: {
        title: 'project-test',
        color: '#000000',
      },
    }

    const { time, attachment } = setup(task)

    expect(time).toBeInTheDocument()
    expect(attachment).not.toBeInTheDocument()
  })

  test('render without time and with attachments', async () => {
    const task: TaskWithProjectType = {
      id: 'test',
      title: 'test task item',
      description: 'task item to be tested',
      projectId: 'test project',
      openTask: false,
      startDate: new Date(),
      endDate: null,
      startTime: null,
      endTime: null,
      attachments: [
        {
          id: 'img-test',
          name: 'test',
          path: 'somewhere',
          height: 100,
          width: 100,
        },
      ],
      status: Status.PROPOSED,
      project: {
        title: 'project-test',
        color: '#000000',
      },
    }

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
