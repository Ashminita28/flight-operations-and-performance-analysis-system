import { describe, it, expect } from "vitest";
import Role from "../../src/models/role";

describe("Role Model", () => {
	it("should build role", () => {
		const role = Role.build({ name: "Admin" });
		expect(role?.dataValues.name).toBe("Admin");
	});
});
