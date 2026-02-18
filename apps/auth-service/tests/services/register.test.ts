import { describe, it, expect, vi, beforeEach } from "vitest";
import * as bcrypt from "bcrypt";
import { registerService } from "../../src/services/auth-service"; // adjust path
import * as repo from "../../src/repositories/auth-repository"; // adjust path

// Mock bcrypt.hash and repo.createUser
vi.mock("bcrypt", () => ({
	hash: vi.fn(),
}));

vi.mock("../../src/repositories/auth-repository", () => ({
	createUser: vi.fn(),
}));

describe("registerService", () => {
	const mockName = "John Doe";
	const mockEmail = "john@example.com";
	const mockPassword = "plainPassword";
	const mockHashedPassword = "hashedPassword123";
	const mockUser = {
		id: 1,
		name: mockName,
		email: mockEmail,
		password: mockHashedPassword,
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should hash the password and create a user", async () => {
		// Arrange
		(bcrypt.hash as unknown as vi.Mock).mockResolvedValue(mockHashedPassword);
		(repo.createUser as vi.Mock).mockResolvedValue(mockUser);

		// Act
		const result = await registerService(mockName, mockEmail, mockPassword);

		// Assert
		expect(bcrypt.hash).toHaveBeenCalledWith(mockPassword, 10);
		expect(repo.createUser).toHaveBeenCalledWith({
			name: mockName,
			email: mockEmail,
			password: mockHashedPassword,
		});
		expect(result).toEqual({ user: mockUser });
	});

	it("should throw if bcrypt.hash fails", async () => {
		(bcrypt.hash as unknown as vi.Mock).mockRejectedValue(
			new Error("Hash error"),
		);

		await expect(
			registerService(mockName, mockEmail, mockPassword),
		).rejects.toThrow("Hash error");
	});

	it("should throw if repo.createUser fails", async () => {
		(bcrypt.hash as unknown as vi.Mock).mockResolvedValue(mockHashedPassword);
		(repo.createUser as vi.Mock).mockRejectedValue(new Error("DB error"));

		await expect(
			registerService(mockName, mockEmail, mockPassword),
		).rejects.toThrow("DB error");
	});
});
