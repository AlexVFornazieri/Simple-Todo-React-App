const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/{!(_app|_document),}.tsx',
    '<rootDir>/src/**/{!(_app|_document),}.ts',
  ],
}

module.exports = async (...args) => {
  const fn = createJestConfig(customJestConfig)
  const res = await fn(...args)

  res.transformIgnorePatterns = res.transformIgnorePatterns.map(pattern => {
    if (pattern === '/node_modules/') {
      return '/node_modules/(?!firebase|@firebase)/'
    }
    return pattern
  })

  return res
}
