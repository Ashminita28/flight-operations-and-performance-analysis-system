import { describe, it, expect } from "vitest";
import { Permission } from "@package/shared-database";

describe("Permission Model", () => {
	it("should build permission", () => {
		const p = Permission.build({ name: "view-admin-dashboard" });
		expect(p?.dataValues.name).toBe("view-admin-dashboard");
	});
});
