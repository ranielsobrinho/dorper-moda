const config = require('./jest.config')
config.testMatch = ['**/*.test.ts']
config.collectCoverage = true
module.exports = config
