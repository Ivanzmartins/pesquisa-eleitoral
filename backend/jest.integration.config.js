
export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.ts'];
export const testTimeout = 30000;
export const verbose = true;
export const transform = {
  '^.+\\.ts?$': 'ts-jest',
};
export const moduleFileExtensions = ['ts', 'js', 'json', 'node'];
export const testMatch = ['**/src/tests/integration/**/*.test.ts'];