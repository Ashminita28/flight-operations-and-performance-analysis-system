import { describe, it, expect, vi, beforeEach } from "vitest";
import bcrypt from "bcrypt";
import * as roleRepo from "../../src/repositories/role-repository";
import * as jwt from "@package/shared-utils";
import { loginService } from "../../src/services/auth-service";

vi.mock("bcrypt");
vi.mock("../../src/repositories/auth-repository");
vi.mock("../../src/repositories/role-repository");
vi.mock("../../src/utils/jwt");

describe("Login Service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should login successfully", async () => {
		const mockUser = {
			id: "1",
			email: "test@test.com",
			password: "hashed",
			Roles: [{ name: "Admin" }],
		};

		(roleRepo.findUserByEmailWithRoles as any).mockResolvedValue(mockUser);
		(bcrypt.compare as any).mockResolvedValue(true);
		(jwt.generateAccessToken as any).mockReturnValue("access");
		(jwt.generateRefreshToken as any).mockReturnValue("refresh");

		const result = await loginService("test@test.com", "Password@123");

		expect(result.user.roles).toContain("Admin");
	});

	it("should throw error if password invalid", async () => {
		const mockUser = {
			id: "1",
			password: "hashed",
			Roles: [],
		};

		(roleRepo.findUserByEmailWithRoles as any).mockResolvedValue(mockUser);
		(bcrypt.compare as any).mockResolvedValue(false);

		await expect(loginService("x", "wrong")).rejects.toThrow(
			"Invalid credentials.",
		);
	});
});
