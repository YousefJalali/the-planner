import { getJestProjects } from '@nrwl/jest'

export default {
  projects: getJestProjects(),
  setupFilesAfterEnv: ['<rootDir>/jest.env.ts', '<rootDir>/jest-setup.js'],
}
