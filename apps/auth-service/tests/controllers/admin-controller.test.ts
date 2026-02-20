import { describe, it, expect, vi } from "vitest";
import * as repo from "../../src/repositories/auth-repository";
import { adminController } from "../../src/controllers/admin-controller";

vi.mock("../../src/repositories/auth-repository");

describe("Admin Controller", () => {
	it("returns all users", async () => {
		const req: any = {};
		const res: any = {
			status: vi.fn().mockReturnThis(),
			json: vi.fn(),
		};

		(repo.findAllUsers as any).mockResolvedValue([{ id: "1" }]);

		await adminController(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
	});
});
