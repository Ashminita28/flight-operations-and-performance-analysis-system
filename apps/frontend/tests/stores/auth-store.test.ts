import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAuthStore } from "../../src/store/auth-store";
import { authService } from "../../src/services/auth-service";
import type { User } from "../../src/services/auth-service";

vi.mock("../../src/services/auth-service");

describe("Auth Store", () => {
	const mockUser: User = {
		id: "1",
		name: "Test User",
		email: "test@mail.com",
	};

	beforeEach(() => {
		useAuthStore.setState({
			user: null,
			loading: false,
			isFetched: false,
			error: null,
		});

		vi.clearAllMocks();
	});

	it("login success", async () => {
		vi.mocked(authService.login).mockResolvedValue(mockUser);

		const result = await useAuthStore.getState().login("a", "b");

		expect(result).toEqual(mockUser);
		expect(useAuthStore.getState().user).toEqual(mockUser);
	});

	it("login failure", async () => {
		vi.mocked(authService.login).mockRejectedValue(new Error("fail"));

		await expect(useAuthStore.getState().login("a", "b")).rejects.toThrow(
			"fail",
		);
	});
});
