module.exports = {
  automock: false,
  bail: 0,
  clearMocks: false,
  collectCoverage: true,
  collectCoverageFrom: [
      './lib/**/*.js',
      '!**/node_modules/**',
      '!**/mocks**',
  ],
    coverageDirectory: './test/code_coverage',
    maxConcurrency: 4,
    moduleDirectories: ['node_modules'],
    resetMocks: false,
    restoreMocks: false,
    testEnvironment: 'node',
    verbose: true,
};
