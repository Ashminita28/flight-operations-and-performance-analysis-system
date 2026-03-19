import bcrypt from "bcrypt";
import crypto from "crypto";

import * as repo from "../repositories/auth-repository";

import {
	ApiError,
	generateAccessToken,
	generateRefreshToken,
	HTTP_STATUS,
	MESSAGES,
	verifyRefreshToken,
} from "@package/shared-utils";

import { Role, UserRole, User } from "@package/shared-database";

import { findUserByEmailWithRoles } from "../repositories/role-repository";

import {
	createOtp,
	findOtp,
	deleteOtp,
} from "../repositories/password-reset-repository";

import { sendEmail } from "./mail";
import { LoginDTO, RegisterDTO, ResetDTO } from "../types/auth-type";
import { logger } from "@package/shared-config";
import { accountCreatedTemplate } from "../utils/email-templae";

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000;
/* REGISTER */

export const registerService = async (data: RegisterDTO) => {
	const existing = await repo.findUserByEmail(data.email);

	if (existing) {
		throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.USER_ALREADY_EXISTS);
	}

	const hashed = await bcrypt.hash(data.password, 10);

	const { roleName, ...userData } = data;

	const user: any = await repo.createUser({
		...userData,
		password: hashed,
		status: "active",
	});

	if (!user?.id) {
		throw new Error("User creation failed");
	}

	// FIND ROLE
	const role = await Role.findOne({
		where: { name: data.roleName },
	});

	if (!role) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.ROLE_NOT_FOUND);
	}

	// ASSIGN ROLE
	await UserRole.create({
		id: crypto.randomUUID(),
		user_id: user.id,
		role_id: role.id,
	});

	// SEND EMAIL
	try {
		await sendEmail(
			data.email,
			"Account Created",
			accountCreatedTemplate(
				data.first_name,
				process.env.FRONTEND_URL + "/login",
			),
		);
	} catch (err) {
		logger.error("Email failed but user created");
	}

	return user;
};

/* LOGIN */
export const loginService = async (data: LoginDTO) => {
	const attempt = loginAttempts.get(data.email);

	if (attempt) {
		if (
			attempt.count >= MAX_ATTEMPTS &&
			Date.now() - attempt.lastAttempt < LOCK_TIME
		) {
			throw new ApiError(
				HTTP_STATUS.TOO_MANY_REQUESTS,
				"Account locked. Try again later",
			);
		}
	}
	const user = await findUserByEmailWithRoles(data.email);

	if (!user) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
	}

	const valid = await bcrypt.compare(data.password, user.password);

	if (!valid) {
		loginAttempts.set(data.email, {
			count: (attempt?.count || 0) + 1,
			lastAttempt: Date.now(),
		});

		throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.WRONG_PASSWORD);
	}

	// reset attempts on success
	loginAttempts.delete(data.email);
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
	const decode = verifyRefreshToken(token);

	const user = await repo.findUserById(decode.userId);

	if (!user) {
		throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.INVALID_TOKEN);
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
		throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
	}

	const otp = Math.floor(100000 + Math.random() * 900000).toString();
	const expires = new Date(Date.now() + 10 * 60 * 1000);
	await createOtp(email, otp, expires);
	await sendEmail(
		email,

		MESSAGES.PASSWORD_RESET_OTP,

		otp,
	);

	return {
		message: MESSAGES.OTP_SENT,
	};
};

/* RESET PASSWORD */

export const resetPasswordService = async (data: ResetDTO) => {
	const record = await findOtp(data.email, data.otp);

	if (!record) {
		throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.INVALID_OTP);
	}

	if (new Date() > record.expires_at) {
		throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.OTP_EXPIRED);
	}

	const hashed = await bcrypt.hash(data.newPassword, 12);

	await repo.updatePassword(data.email, hashed);
	await deleteOtp(data.email);

	return {
		message: MESSAGES.PASSWORD_RESET_SUCCESSFULL,
	};
};
