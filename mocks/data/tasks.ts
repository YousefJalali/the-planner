import { TaskType, Status, ImageType } from '../../common/types/TaskType'
import { ProjectType } from '../../common/types/ProjectType'
import faker from '@faker-js/faker'
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

  const today = new Date()

  const sameDayNextWeek = new Date()
  sameDayNextWeek.setDate(today.getDate() + 7)
  sameDayNextWeek.setHours(0, 0, 0, 0)

  const sameDayLastWeek = new Date()
  sameDayLastWeek.setDate(today.getDate() - 7)
  sameDayLastWeek.setHours(0, 0, 0, 0)

  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    projectId: project.id,
    startDate: faker.date.between(
      sameDayLastWeek.toDateString(),
      sameDayNextWeek.toDateString()
    ),
    endDate: faker.date.future(),
    openTask: Math.random() < 0.5,
    startTime: faker.date.recent(),
    endTime: faker.date.future(),
    attachments: new Array(randomInteger(0, 10)).fill(0).map(
      (e) =>
        ({
          id: faker.datatype.uuid(),
          width: 375,
          height: 812,
          path: faker.image.imageUrl(375, 812),
        } as ImageType)
    ),
    status: _.sample(Object.values(Status)) as Status,
  }
}

export const multipleTasks: (projects: ProjectType[]) => TaskType[] = (
  projects
) => {
  return Array.from({ length: 500 }, () => task(projects))
}
