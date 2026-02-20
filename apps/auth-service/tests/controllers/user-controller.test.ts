import { describe, it, expect, vi } from "vitest";
import * as service from "../../src/services/user-service";
import { getUserProfile } from "../../src/controllers/user-controller";

vi.mock("../../src/services/user-service");

describe("User Controller", () => {
	it("returns profile", async () => {
		const req: any = { user: { userId: "1" } };
		const res: any = {
			status: vi.fn().mockReturnThis(),
			json: vi.fn(),
		};

		(service.userService as any).mockResolvedValue({
			id: "1",
		});

		await getUserProfile(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
	});
});
