import { describe, it, expect, vi } from "vitest";
import * as jwt from "@package/shared-utils";
import { authenticate } from "@package/shared-middleware";

vi.mock("../../src/utils/jwt");

describe("Authenticate Middleware", () => {
	it("calls next when token valid", () => {
		const req: any = { cookies: { accessToken: "valid" } };
		const res: any = {
			status: vi.fn().mockReturnThis(),
			json: vi.fn(),
		};
		const next = vi.fn();

		(jwt.verifyAccessToken as any).mockReturnValue({
			userId: "1",
		});

		authenticate(req, res, next);

		expect(next).toHaveBeenCalled();
	});
});
