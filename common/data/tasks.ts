import { TaskType, Status } from '../types/TaskType'
import { ProjectType } from '../types/ProjectType'
import faker from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

const randomEnumValue = (enumeration: any) => {
  const values = Object.keys(enumeration)
  const enumKey = values[Math.floor(Math.random() * values.length)]
  return enumeration[enumKey]
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const task: (projects: ProjectType[]) => TaskType = (projects) => {
  const project = _.sample(projects)!

  return {
    id: uuidv4(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    project: project.id,
    date: {
      startDate: faker.date.recent(),
      endDate: faker.date.future(),
    },
    openTask: Math.random() < 0.5,
    time: {
      startTime: faker.date.recent(),
      endTime: faker.date.future(),
    },
    attachments: new Array(randomInteger(0, 10)).fill(0).map((e) => ({
      id: uuidv4(),
      width: 375,
      height: 812,
      path: faker.image.imageUrl(375, 812),
    })),
    isHidden: Math.random() < 0.5,
    status: _.sample(Object.values(Status)) as Status,
  }
}

export const multipleTasks: (projects: ProjectType[]) => TaskType[] = (
  projects
) => {
  return Array.from({ length: 20 }, () => task(projects))
}
