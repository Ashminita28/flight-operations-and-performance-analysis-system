import { describe, it, expect } from "vitest";
import * as service from "../src/services/auth-service";
import { vi } from "vitest";
import * as repo from "../src/repositories/auth-repository";

vi.mock("../src/repositories/auth.repository");

describe("Auth Service", () => {
	// test for register
	describe("Register", () => {
		it("should register a user successfully", async () => {
			it("register user", async () => {
				(repo.createUser as any).mockResolvedValue({ id: 1 });
			});
			const user = await service.registerService("register@test.com", "hiii23");
			expect(user.email).toBe("register@test.com");
		});

		it("should throw error if user already exists", async () => {
			await service.registerService("duplicate@test.com");

			await expect(
				service.registerService("duplicate@test.com"),
			).rejects.toThrow();
		});
	});

	//   test for login
	describe("Login", () => {
		it("should login user and return token", async () => {
			await service.loginService("login@test.com");

			const token = await service.loginService("login@test.com");

			expect(token).toBeDefined();
		});

		it("should throw error for invalid credentials", async () => {
			await expect(
				service.loginService("wrong@test.com", "hihi123"),
			).rejects.toThrow();
		});
	});

	//   test for verigying the token
	describe("JWT Verify", () => {
		it("should verify token successfully", async () => {
			await service.registerService("verify@test.com", "hihi123");
			const token = await loginService("verify@test.com", "hihi123");

			const decoded = service.refreshTokenService(token);

			expect(decoded.email).toBe("verify@test.com");
		});
	});

	//   test for logout
	describe("Logout", () => {
		it("should logout user and token", async () => {
			await service.registerService("logout@test.com", "hihi123");
			const token = await service.loginService("logout@test.com", "hihi123");

			const result = service.logoutService(token);

			expect(result).toBe(true);
		});
	});
});
