import { describe, it, expect } from "vitest";
import {
	registerUser,
	loginUser,
	verifyToken,
	logoutUser,
} from "../services/auth.service";

describe("Auth Service", () => {
	// test for register
	describe("Register", () => {
		it("should register a user successfully", async () => {
			const user = await registerUser("register@test.com", "hihi123");
			expect(user.email).toBe("register@test.com");
		});

		it("should throw error if user already exists", async () => {
			await registerUser("duplicate@test.com", "hihi123");

			await expect(
				registerUser("duplicate@test.com", "hihi123"),
			).rejects.toThrow();
		});
	});

	//   test for login
	describe("Login", () => {
		it("should login user and return token", async () => {
			await registerUser("login@test.com", "hihi123");

			const token = await loginUser("login@test.com", "hihi123");

			expect(token).toBeDefined();
		});

		it("should throw error for invalid credentials", async () => {
			await expect(loginUser("wrong@test.com", "hihi123")).rejects.toThrow();
		});
	});

	//   test for verigying the token
	describe("JWT Verify", () => {
		it("should verify token successfully", async () => {
			await registerUser("verify@test.com", "hihi123");
			const token = await loginUser("verify@test.com", "hihi123");

			const decoded = verifyToken(token);

			expect(decoded.email).toBe("verify@test.com");
		});
	});

	//   test for logout
	describe("Logout", () => {
		it("should logout user and token", async () => {
			await registerUser("logout@test.com", "hihi123");
			const token = await loginUser("logout@test.com", "hihi123");

			const result = logoutUser(token);

			expect(result).toBe(true);
		});
	});
});
