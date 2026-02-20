import { describe, it, expect, vi, beforeEach } from "vitest";
import * as repo from "../../src/repositories/auth-repository";
import bcrypt from "bcrypt";
import { registerService } from "../../src/services/auth-service";
import Role from "../../src/models/role";
import UserRole from "../../src/models/user-role";

vi.mock("bcrypt");
vi.mock("../../src/repositories/auth-repository");
vi.mock("../../src/models/role");
vi.mock("../../src/models/user-role");

describe("Register Service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should hash password and create user", async () => {
		(bcrypt.hash as any).mockResolvedValue("hashedPassword");

		(repo.createUser as any).mockResolvedValue({
			id: "550e8400-e29b-41d4-a716-446655440000",
			email: "test@test.com",
		});

		(Role.findOne as any).mockResolvedValue({
			id: "660e8400-e29b-41d4-a716-446655440000",
		});

		(UserRole.create as any).mockResolvedValue(true);

		const result = await registerService(
			"Test",
			"test@test.com",
			"9999999999",
			"Password@123",
		);

		expect(UserRole.create).toHaveBeenCalled();
		expect(result.user.email).toBe("test@test.com");
	});
});
