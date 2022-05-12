import faker from '@faker-js/faker'
import randomColor from 'randomcolor'
import ObjectID from 'bson-objectid'
import { ProjectType } from '../../common/types/ProjectType'

export const project: () => ProjectType = () => {
  return {
    id: ObjectID().toHexString(),
    title: faker.company.companyName(),
    description: faker.lorem.paragraph(),
    color: randomColor(),
    proposed: 0,
    inprogress: 0,
    completed: 0,
    progressPercentage: 0,
    isHidden: Math.random() < 0.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export const multipleProjects: () => ProjectType[] = () => {
  const projects = Array.from({ length: 50 }, project)
  return projects
  // return projects.map((p, i) => ({
  //   ...p,
  //   title: i + 1 + ' - ' + p.title,
  // }))
}
