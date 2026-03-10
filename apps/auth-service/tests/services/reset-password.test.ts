import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcrypt";
import * as resetRepo from "../../src/repositories/password-reset-repository";
import { User } from "@package/shared-database";
import { resetPasswordService } from "../../src/services/auth-service";

vi.mock("bcrypt");
vi.mock("../../src/repositories/password-reset-repository");
vi.mock("@package/shared-database");

describe("Reset Password Service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should reset password if OTP valid", async () => {
		(resetRepo.findOtp as any).mockResolvedValue({
			expiresAt: new Date(Date.now() + 10000),
		});

		(bcrypt.hash as any).mockResolvedValue("newHashed");
		(User.update as any).mockResolvedValue(true);

		const result = await resetPasswordService(
			"test@test.com",
			"123456",
			"NewPass@123",
		);

		expect(User.update).toHaveBeenCalled();
		expect(result.message).toBe("Password reset successful");
	});
});
