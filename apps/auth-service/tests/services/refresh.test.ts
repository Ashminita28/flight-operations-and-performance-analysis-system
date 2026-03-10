import { describe, it, expect, vi } from "vitest";
import * as repo from "../../src/repositories/auth-repository";
import * as jwt from "@package/shared-utils";
import { refreshTokenService } from "../../src/services/auth-service";

vi.mock("../../src/repositories/auth-repository");
vi.mock("../../src/utils/jwt");

describe("Refresh Token Service", () => {
	it("should generate new access token", async () => {
		(jwt.verifyRefreshToken as any).mockReturnValue({
			userId: "1",
		});

		(repo.findUserById as any).mockResolvedValue({
			refreshToken: "valid",
		});

		(jwt.generateAccessToken as any).mockReturnValue("newAccess");

		const result = await refreshTokenService("valid");

		expect(result).toBe("newAccess");
	});
});
