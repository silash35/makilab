import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },

  collectCoverageFrom: ["src/**/*.(t|j)s", "!src/main.ts"],
  coverageDirectory: "./coverage",
};
export default config;
