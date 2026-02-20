import { describe, it, expect, vi } from "vitest";
import * as repo from "../../src/repositories/auth-repository";
import { logoutService } from "../../src/services/auth-service";

vi.mock("../../src/repositories/auth-repository");

describe("Logout Service", () => {
	it("should remove refresh token", async () => {
		(repo.saveRefreshToken as any).mockResolvedValue(true);

		const result = await logoutService("1");

		expect(repo.saveRefreshToken).toHaveBeenCalledWith("1", null);
		expect(result.message).toBe("Logged out successfully");
	});
});
