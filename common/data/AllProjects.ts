import ProjectType from '../types/ProjectType'
import faker from 'faker'
import { v4 as uuidv4 } from 'uuid'

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const project: () => ProjectType = () => {
  const proposed = randomInteger(1, 20)
  const inprogress = randomInteger(0, proposed)
  const completed = proposed - inprogress

  return {
    id: uuidv4(),
    title: faker.company.companyName(),
    description: faker.lorem.paragraph(),
    color: `#${('00000' + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(
      -6
    )}`,
    tasks: ['task1', 'task2'],
    proposed,
    inprogress,
    completed,
    progress: +((completed * 100) / proposed).toFixed(0),
    isHidden: Math.random() < 0.5,
  }
}

const allProjects: () => ProjectType[] = () => {
  return Array.from({ length: 2 }, project)
}

export default allProjects
