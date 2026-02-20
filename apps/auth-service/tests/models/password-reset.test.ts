import { describe, it, expect } from "vitest";
import PasswordReset from "../../src/models/passwordReset";

describe("PasswordReset Model", () => {
	it("should build OTP record", () => {
		const pr = PasswordReset.build({
			email: "test@test.com",
			otp: "123456",
		});

		expect(pr?.dataValues.otp).toBe("123456");
	});
});
