const { resolve } = require('path')
const root = resolve(__dirname)

module.exports = {

  rootDir: root,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "@test/(.*)": "<rootDir>/test/$1"
  },
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [
    "src/**/__tests__/**/*.test.ts",
    "test/**/*.test.ts"
  ],

};
