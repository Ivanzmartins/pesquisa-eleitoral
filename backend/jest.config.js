module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	testTimeout: 30000,
	verbose: true,
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	testMatch: ['**/tests/**/*.test.ts'],
};
