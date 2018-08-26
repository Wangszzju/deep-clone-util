// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js}',
    '!**/node_modules/**',
    '!**/__tests__/**',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: '<rootDir>/test/coverage/',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    'html',
    'text-summary'
  ],

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    '<rootDir>/src/'
  ],

  // The paths to modules that run some code to configure or set up the testing environment before each test

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/?(*.)+(spec|test).js?(x)'
  ]
};
