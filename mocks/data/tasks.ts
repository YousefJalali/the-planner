import { TaskType, Status, ImageType } from '../../common/types/TaskType'
import { ProjectType } from '../../common/types/ProjectType'
import faker from '@faker-js/faker'
import _ from 'lodash'
import ObjectID from 'bson-objectid'

const randomEnumValue = (enumeration: any) => {
  const values = Object.keys(enumeration)
  const enumKey = values[Math.floor(Math.random() * values.length)]
  return enumeration[enumKey]
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const task: (projects: ProjectType[], startDate: Date) => TaskType = (
  projects,
  startDate
) => {
  const project = _.sample(projects)!

  const openTask = Math.random() < 0.5

  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 10)

  return {
    id: ObjectID().toHexString(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    projectId: project.id,
    startDate,
    endDate: openTask ? null : endDate,
    openTask,
    startTime: openTask ? null : faker.date.recent(),
    endTime: openTask ? null : faker.date.future(),
    attachments: new Array(randomInteger(0, 10)).fill(0).map(
      (e) =>
        ({
          id: faker.datatype.uuid(),
          name: faker.lorem.slug(),
          width: 375,
          height: 812,
          path: faker.image.imageUrl(375, 812, 'business'),
        } as ImageType)
    ),
    status: _.sample(Object.values(Status)) as Status,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export const multipleTasks: (projects: ProjectType[]) => TaskType[] = (
  projects
) => {
  const tasks = new Array(10).fill(0).map((day, i) => {
    const date = new Date(2022, 3, 1, 0, 0, 0, 0)
    date.setDate(date.getDate() + i)

    return new Array(10).fill(0).map((t, i) => task(projects, new Date(date)))
  })

  return _.flatten(tasks)
}
