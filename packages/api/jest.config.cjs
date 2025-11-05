module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  roots: ['<rootDir>/test'],
  transform: {
    '^.+\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\.|/)(test|spec))\.tsx?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts']
};