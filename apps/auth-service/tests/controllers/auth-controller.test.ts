import { describe, it, expect, vi } from "vitest";
import * as service from "../../src/services/auth-service";
import {
	registerUser,
	loginUser,
	logoutUser,
} from "../../src/controllers/auth-controller";

vi.mock("../../src/services/auth-service");

describe("Auth Controller", () => {
	it("registerUser success", async () => {
		const req: any = {
			body: {
				name: "Test",
				email: "test@test.com",
				phone: "999",
				password: "Pass@123",
			},
		};

		const res: any = {
			status: vi.fn().mockReturnThis(),
			json: vi.fn(),
		};

		(service.registerService as any).mockResolvedValue({
			user: { id: "1" },
		});

		await registerUser(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
	});

	it("loginUser sets cookies", async () => {
		const req: any = { body: { email: "x", password: "y" } };
		const res: any = {
			cookie: vi.fn(),
			status: vi.fn().mockReturnThis(),
			json: vi.fn(),
		};

		(service.loginService as any).mockResolvedValue({
			accessToken: "a",
			refreshToken: "r",
			user: { id: "1" },
		});

		await loginUser(req, res);

		expect(res.cookie).toHaveBeenCalledTimes(2);
	});
});
