export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/core/$1',
    '@infra/(.*)': '<rootDir>/infra/$1',
    '@shared/(.*)': '<rootDir>/shared/$1',
  },
};
