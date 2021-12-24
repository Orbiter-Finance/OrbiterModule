module.exports = {
  testEnvironment: 'node',

  roots: ['<rootDir>/test'],
  testRegex: 'test/(.+)\\.test\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  collectCoverage: true,
  collectCoverageFrom: ['src/*.(jsx?|tsx?)'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 70,
      lines: 80,
    },
  },
}
