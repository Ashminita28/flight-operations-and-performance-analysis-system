import { describe, it, expect } from "vitest";
import User from "../../src/models/user";

describe("User Model", () => {
	it("should build user", () => {
		const user = User.build({
			name: "Test",
			email: "test@test.com",
		});

		expect(user?.dataValues.name).toBe("Test");
	});
});
