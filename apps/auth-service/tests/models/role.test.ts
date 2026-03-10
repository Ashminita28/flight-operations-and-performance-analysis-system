import { describe, it, expect } from "vitest";
import { Role } from "@package/shared-database";

describe("Role Model", () => {
	it("should build role", () => {
		const role = Role.build({ name: "Admin" });
		expect(role?.dataValues.name).toBe("Admin");
	});
});
