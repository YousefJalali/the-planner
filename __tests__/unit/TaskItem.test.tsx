import { render } from '../../test-utils'
import TaskItem from '../../components/task/TaskItem'
import { TaskType } from '../../common/types/TaskType'

function setup({ task }: { task: TaskType }) {
  const onCheck: () => void = jest.fn()

  const utils = render(<TaskItem task={task} onCheck={onCheck} />)

  const checkButton = utils.queryByAltText(/preview-/i)
  const attachment = utils.queryByTestId(/taskItem-attachment/i)
  const time = utils.queryByTestId(/taskItem-time/i)

  return {
    ...utils,
    checkButton,
    attachment,
    time,
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
      completed: false,
    } as TaskType

    const { time, attachment } = setup({ task })

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
      completed: false,
    } as TaskType

    const { time, attachment } = setup({ task })

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
      completed: false,
    } as TaskType

    const { time, attachment } = setup({ task })

    expect(time).not.toBeInTheDocument()
    expect(attachment).toBeInTheDocument()
  })
})
