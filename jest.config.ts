import { getJestProjects } from '@nx/jest'

export default {
  projects: getJestProjects(),
  setupFilesAfterEnv: ['<rootDir>/jest.env.ts', '<rootDir>/jest-setup.js'],
}
