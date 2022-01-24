import { Status, TaskType } from '../types/TaskType'
import ProjectType from '../types/ProjectType'
import faker from 'faker'
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

const task: (projects: ProjectType[]) => TaskType = (projects) => {
  const project = _.sample(projects)!

  return {
    id: uuidv4(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    project: {
      id: project.id,
      title: project.title,
      color: project.color,
    },
    isOpen: Math.random() < 0.5,
    startDate: faker.date.recent().toString(),
    startTime: faker.date.recent().toString(),
    endDate: faker.date.future().toString(),
    endTime: faker.date.future().toString(),
    attachments: new Array(randomInteger(0, 10)).fill(0).map((e) => ({
      id: uuidv4(),
      width: 375,
      height: 812,
      path: faker.image.imageUrl(375, 812),
    })),
    isHidden: Math.random() < 0.5,
    status: randomEnumValue(Status),
  }
}

const allTasks: (projects: ProjectType[]) => TaskType[] = (projects) => {
  return Array.from({ length: 10 }, () => task(projects))
}

export default allTasks
