import { Status, TaskWithProjectType } from '@the-planner/types'

export const taskSample = {
  id: 'task-id',
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
    id: 'project-id',
    title: 'project-test',
    color: '#000000',
  },
  createdAt: new Date(),
  updatedAt: new Date(),
} as TaskWithProjectType
