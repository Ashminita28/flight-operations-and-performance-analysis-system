import * as repo from "../repositories/auth-repository";
import bcrypt from "bcrypt";
import {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} from "../utils/jwt";
import { findUserByEmailWithRoles } from "../repositories/role-repository";
import Role from "../models/role";
import constants from "../utils/constants";
import UserRole from "../models/user-role";
// import sequelize from "@repo/shared-databse";
import crypto from "crypto";

// 1.Registeration service
export const registerService = async (
	name: string,
	email: string,
	phone: string,
	password: string,
) => {
	// const transaction=await sequelize.transaction();
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await repo.createUser({
		name,
		email,
		phone,
		password: hashedPassword,
		status: "active",
	});

	// assigning default role
	const role = await Role.findOne({
		where: { name: "Operations" },
	});
	if (!role) throw new Error("Default role not found");

	if (role) {
		await UserRole.create({
			id: crypto.randomUUID(),
			user_id: user.id,
			role_id: role.id,
		});

		// await transaction.commit();
	}
	return { user };
};

// 2.Login service
export const loginService = async (email: string, password: string) => {
	console.log(email);
	console.log(password);

	const user = await findUserByEmailWithRoles(email);
	console.log(user);
	console.log(user.password);
	if (!user) throw new Error("User not found");

	if (!user.password) {
		throw new Error("Password not set for this user");
	}

	console.log("Entered password", password);
	console.log("Stored password", user.password);

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		throw new Error("Invalid credentials.");
	}
	console.log("compare result:", isPasswordValid);

	const accessToken = generateAccessToken({
		userId: user.id,
	});

	const refreshToken = generateRefreshToken({
		userId: user.id,
	});

	await repo.saveRefreshToken(user.id, refreshToken);

	const roles = user.Roles?.map((role: any) => role.name) || [];

	return {
		accessToken,
		refreshToken,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			roles,
		},
	};
};

// 3.Logout service
export const logoutService = async (userId: string) => {
	await repo.saveRefreshToken(userId, null as any);
	return { message: "Logged out successfully" };
};

// 4.refresh token service
export const refreshTokenService = async (token: string) => {
	const decode: any = verifyRefreshToken(token);

	const user = await repo.findUserById(decode.userId);
	if (!user || user.refreshToken !== token) {
		throw new Error("Invalid refresh token");
	}
	return generateAccessToken({ userId: user.id });
};
