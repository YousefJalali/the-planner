import { Task, Status, Attachment } from '@the-planner/types'
import { Project } from '@the-planner/types'
import faker from '@faker-js/faker'
import ObjectID from 'bson-objectid'
import { setHours } from 'date-fns'
import set from 'date-fns/set'
import sample from 'lodash-es/sample'
import flatten from 'lodash-es/flatten'

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const task: (projects: Project[], initialDate: Date) => Task = (
  projects,
  initialDate
) => {
  const project = sample(projects)!

  const openTask = Math.random() < 0.5

  const startDate = setHours(new Date(initialDate), 12)

  const endDate = setHours(new Date(startDate), 12)
  endDate.setDate(endDate.getDate() + 10)

  const startTime =
    Math.random() < 0.5
      ? set(new Date(startDate), {
          hours: randomInteger(1, 24),
          minutes: randomInteger(1, 60),
        })
      : null

  const endTime =
    Math.random() < 0.5
      ? set(new Date(endDate), {
          hours: randomInteger(1, 24),
          minutes: randomInteger(1, 60),
        })
      : null

  return {
    id: ObjectID().toHexString(),
    userId: ObjectID().toHexString(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    projectId: project.id,
    startDate: startDate,
    endDate: openTask ? null : endDate,
    openTask,
    startTime: openTask ? null : startTime,
    endTime: openTask ? null : endTime,
    attachments: new Array(randomInteger(0, 10)).fill(0).map(
      (e) =>
        ({
          id: faker.datatype.uuid(),
          name: faker.lorem.slug(),
          width: 375,
          height: 812,
          path: faker.image.imageUrl(375, 812, 'business'),
        } as Attachment)
    ),
    status: sample(Object.values(Status)) as Status,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export const multipleTasks: (projects: Project[]) => Task[] = (projects) => {
  const initialDate = setHours(new Date(), 12)
  initialDate.setDate(initialDate.getDate() - 15)

  const tasks = new Array(30).fill(0).map((day, i) => {
    const date = new Date(initialDate)
    date.setDate(date.getDate() + i)

    return new Array(5).fill(0).map((t, i) => task(projects, date))
  })

  return flatten(tasks)
}
