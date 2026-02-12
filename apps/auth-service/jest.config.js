export const preset = "ts-jest";
export const testEnvironment = "node";
export const moduleFileExtensions = ["ts", "js"];
export const testMatch = ["**/tests/**/*.test.(ts|js)"];
export const globals = {
	"ts-jest": {
		tsconfig: "tsconfig.json",
	},
};
