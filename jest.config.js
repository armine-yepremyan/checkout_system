module.exports = {
  roots: [
    "<rootDir>/tests"
  ],
  testMatch: [
    "<rootDir>/tests/**.ts"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testEnvironment: "node"
}