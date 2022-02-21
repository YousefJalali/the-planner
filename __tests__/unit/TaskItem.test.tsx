import { render } from '../../test-utils'
import TaskItem from '../../components/task/TaskItem'
import { Status, TaskType } from '../../common/types/TaskType'

function setup({ task }: { task: TaskType }) {
  const onChangeStatus: () => void = jest.fn()
  const onDelete: () => void = jest.fn()
  const onEdit: () => void = jest.fn()

  const utils = render(
    <TaskItem
      task={task}
      onChangeStatus={onChangeStatus}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  )

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
      status: Status.PROPOSED,
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
      status: Status.PROPOSED,
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
      status: Status.PROPOSED,
    } as TaskType

    const { time, attachment } = setup({ task })

    expect(time).not.toBeInTheDocument()
    expect(attachment).toBeInTheDocument()
  })
})
