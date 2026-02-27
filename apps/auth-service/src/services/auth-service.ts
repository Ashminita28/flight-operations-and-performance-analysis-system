import bcrypt from "bcrypt";
import crypto from "crypto";

import * as repo from "../repositories/auth-repository";

import {
	generateAccessToken,
	generateRefreshToken,
	verifyRefreshToken,
} from "@package/shared-utils";

import { Role, UserRole, User } from "@package/shared-database";

import { findUserByEmailWithRoles } from "../repositories/role-repository";

import {
	createOtp,
	findOtp,
	deleteOtp,
} from "../repositories/passwordReset-repository";

import { sendEmail } from "./mail";

/* REGISTER */

export const registerService = async (
	first_name: string,
	last_name: string,
	email: string,
	phone: string,
	password: string,
	roleName: string,
) => {
	const existing = await repo.findUserByEmail(email);

	if (existing) {
		throw new Error("User already exists");
	}

	const hashed = await bcrypt.hash(password, 10);

	const user: any = await repo.createUser({
		first_name,
		last_name,
		email,
		phone,
		password: hashed,
		status: "active",
	});

	if (!user?.id) {
		throw new Error("User creation failed");
	}

	// FIND ROLE
	const role = await Role.findOne({
		where: { name: roleName },
	});

	if (!role) {
		throw new Error("Role not found");
	}

	// ASSIGN ROLE
	await UserRole.create({
		id: crypto.randomUUID(),
		user_id: user.id,
		role_id: role.id,
	});

	// SEND EMAIL (SAFE VERSION)
	try {
		await sendEmail(
			email,
			"Flight System Credentials",

			`Hello ${first_name},

Your account has been created.

Email: ${email}
Password: ${password}
Role: ${roleName}

Login:
http://localhost:5173/login

Thank you.
Flight System`,
		);
	} catch (err) {
		console.log("Email failed but user created", err);
	}

	return user;
};

/* LOGIN */

export const loginService = async (email: string, password: string) => {
	const user = await findUserByEmailWithRoles(email);

	if (!user) {
		throw new Error("User not found");
	}

	const valid = await bcrypt.compare(password, user.password);

	if (!valid) {
		throw new Error("Wrong password");
	}

	const roles = user.Roles.map((r: any) => r.name);

	const accessToken = generateAccessToken({
		userId: user.id,

		roles,
	});

	const refreshToken = generateRefreshToken({
		userId: user.id,
	});

	await repo.saveRefreshToken(user.id, refreshToken);

	return {
		accessToken,

		refreshToken,

		user: {
			id: user.id,

			name: user.first_name + " " + user.last_name,

			email: user.email,

			roles,
		},
	};
};

/* LOGOUT */

export const logoutService = async (userId: string) => {
	await repo.saveRefreshToken(userId, null as any);
};

/* REFRESH TOKEN */

export const refreshTokenService = async (token: string) => {
	const decode: any = verifyRefreshToken(token);

	const user = await findUserByEmailWithRoles(decode.userId);

	if (!user) {
		throw new Error("Invalid token");
	}

	const roles = user.Roles.map((r: any) => r.name);

	return generateAccessToken({
		userId: user.id,

		roles,
	});
};

/* FORGOT PASSWORD */

export const forgotPasswordService = async (email: string) => {
	const user = await repo.findUserByEmail(email);

	if (!user) {
		throw new Error("User not found");
	}

	const otp = Math.floor(100000 + Math.random() * 900000).toString();

	const expires = new Date(Date.now() + 10 * 60 * 1000);

	await createOtp(email, otp, expires);

	await sendEmail(
		email,

		"Password Reset OTP",

		otp,
	);

	return {
		message: "OTP sent",
	};
};

/* RESET PASSWORD */

export const resetPasswordService = async (
	email: string,
	otp: string,
	newPassword: string,
) => {
	const record: any = await findOtp(email, otp);

	if (!record) {
		throw new Error("Invalid OTP");
	}

	if (new Date() > record.expires_at) {
		throw new Error("OTP expired");
	}

	const hashed = await bcrypt.hash(newPassword, 10);

	await User.update(
		{ password: hashed },

		{ where: { email } },
	);

	await deleteOtp(email);

	return {
		message: "Password reset successful",
	};
};
