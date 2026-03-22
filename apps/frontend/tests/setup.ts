import { beforeEach, afterEach, vi } from "vitest";
import "@testing-library/jest-dom";

// 1. Clear mocks every test
beforeEach(() => {
	vi.clearAllMocks();
});

// 2. Restore everything after test
afterEach(() => {
	vi.restoreAllMocks();
});

vi.mock("@/api/api", () => ({
	api: vi.fn(() => {
		throw new Error("API should be mocked in tests");
	}),
}));
