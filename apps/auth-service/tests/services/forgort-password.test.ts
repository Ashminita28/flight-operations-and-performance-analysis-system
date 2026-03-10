import { describe, it, expect, vi, beforeEach } from "vitest";
import * as userRepo from "../../src/repositories/auth-repository";
import * as resetRepo from "../../src/repositories/password-reset-repository";
import * as mail from "../../src/services/mail";
import { forgotPasswordService } from "../../src/services/auth-service";

vi.mock("../../src/repositories/auth-repository");
vi.mock("../../src/repositories/passwordReset-repository");
vi.mock("../../src/utils/mail");

describe("Forgot Password Service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should generate OTP and send email", async () => {
		(userRepo.findUserByEmail as any).mockResolvedValue({
			email: "test@test.com",
		});

		(resetRepo.createOtp as any).mockResolvedValue(true);
		(mail.sendEmail as any).mockResolvedValue(true);

		const result = await forgotPasswordService("test@test.com");

		expect(resetRepo.createOtp).toHaveBeenCalled();
		expect(mail.sendEmail).toHaveBeenCalled();
		expect(result.message).toBe("OTP sent to email");
	});
});
