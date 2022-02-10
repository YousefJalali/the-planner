import { ProjectType } from '../types/ProjectType'
import faker from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'

// function randomInteger(min: number, max: number) {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }

export const project: () => ProjectType = () => {
  return {
    id: uuidv4(),
    title: faker.company.companyName(),
    description: faker.lorem.paragraph(),
    color: `#${('00000' + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(
      -6
    )}`,
    tasks: [],
    proposed: 0,
    inprogress: 0,
    completed: 0,
    progressPercentage: 0,
    isHidden: Math.random() < 0.5,
  }
}

export const multipleProjects: () => ProjectType[] = () => {
  return Array.from({ length: 5 }, project)
}
