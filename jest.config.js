module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/domain/**', '!<rootDir>/src/main/**', '!<rootDir>/src/**/**-protocols.ts', '!<rootDir>/src/**/index.ts'],
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: 'ts-jest'
}
