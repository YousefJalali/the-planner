import faker from '@faker-js/faker'
import randomColor from 'randomcolor'
import ObjectID from 'bson-objectid'
import { ProjectType } from '@the-planner/types'

export const project: () => ProjectType = () => {
  return {
    id: ObjectID().toHexString(),
    title: faker.company.companyName(),
    description: faker.lorem.paragraph(),
    color: randomColor(),
    isHidden: Math.random() < 0.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export const multipleProjects: () => ProjectType[] = () => {
  const projects = Array.from({ length: 20 }, project)
  return projects
}
