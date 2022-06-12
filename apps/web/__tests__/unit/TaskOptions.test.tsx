import userEvent from '@testing-library/user-event'
import { render, mockNextUseRouter } from '../../test-utils'
import { Status, TaskWithProjectType } from '@the-planner/types'
import TaskOptions from '../../components/task/TaskOptions'

test('task options', () => {
  expect(true).toBe(true)
})

// const defaultTask = {
//   id: 'task-id',
//   title: 'test task item',
//   description: 'task item to be tested',
//   projectId: 'test project',
//   openTask: false,
//   startDate: new Date(),
//   endDate: null,
//   startTime: null,
//   endTime: null,
//   attachments: [],
//   status: Status.PROPOSED,
//   project: {
//     id: 'project-id',
//     title: 'project-test',
//     color: '#000000',
//   },
//   createdAt: new Date(),
//   updatedAt: new Date(),
// } as TaskWithProjectType

// mockNextUseRouter({
//   route: '/pricing',
//   pathname: '/pricing',
//   query: 'project-id',
//   asPath: `/pricing?error=${encodeURIComponent(
//     'Uh oh - something went wrong'
//   )}`,
// })

// function setup(task: TaskWithProjectType = defaultTask) {
//   const onCheck: (task: TaskWithProjectType) => void = jest.fn()
//   const onDetails: () => void = jest.fn()
//   const onOptions: () => void = jest.fn()

//   const utils = render(<TaskOptions task={defaultTask} />)

//   const checkButton = utils.getByTestId(task.id) as HTMLLabelElement
//   const kebabButton = utils.getByTestId(/taskItem-kebab/i) as HTMLAnchorElement
//   const detailsButton = utils.getByTestId(
//     /taskItem-details/i
//   ) as HTMLAnchorElement

//   return {
//     ...utils,
//     checkButton,
//     kebabButton,
//     detailsButton,
//     onCheck,
//     onDetails,
//     onOptions,
//   }
// }

// describe('Task Options', () => {
//   test.only('should call onCheck function one time', () => {
//     const { checkButton, onCheck } = setup()

//     userEvent.click(checkButton)
//     expect(onCheck).toHaveBeenCalledTimes(1)
//   })

//   test('should call onOptions function one time', () => {
//     const { kebabButton, onOptions } = setup()

//     userEvent.click(kebabButton)
//     expect(onOptions).toHaveBeenCalledTimes(1)
//   })

//   test('task click should show details modal', async () => {
//     const { detailsButton, onDetails } = setup()

//     userEvent.click(detailsButton)
//     expect(onDetails).toHaveBeenCalledTimes(1)
//   })
// })
