import { describe, it, expect, vi, beforeEach } from "vitest";
import * as repo from "../../src/repositories/auth-repository";
import bcrypt from "bcrypt";
import { registerService } from "../../src/services/auth-service";
import { Role } from "@package/shared-database";
import { UserRole } from "@package/shared-database";

vi.mock("bcrypt");
vi.mock("../../src/repositories/auth-repository");
vi.mock("@package/shared-database");

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
			"Ashminitta",
			"Baliarsingh",
			"test@test.com",
			"9999999999",
			"Password@123",
			"Operations",
		);

		expect(UserRole.create).toHaveBeenCalled();
		expect(result.user.email).toBe("test@test.com");
	});
});
