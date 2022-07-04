module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "<rootDir>/src/components/**/*.js",
    "<rootDir>/src/pages/**/*.js",
    "<rootDir>/src/hooks/**/*.js",
    "<rootDir>/src/store/**/*.js",
  ],
};
