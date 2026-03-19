import { NextFunction, Request, Response } from "express";
import * as service from "../services/auth-service";
import {
	LoginBody,
	loginSchema,
	RegisterBody,
	registerSchema,
	ResetBody,
	resetSchema,
} from "../validations/auth-schema";
import { HTTP_STATUS, MESSAGES, sendResponse } from "@package/shared-utils";
import { cookieOptions } from "../utils/cookie-options";

// register user
export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const validateData: RegisterBody = registerSchema.parse(req.body);
		const register = await service.registerService(validateData);
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.USER_CREATED,
			data: register,
		});
	} catch (error) {
		next(error);
	}
};

// login user
export const loginUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const validateData: LoginBody = loginSchema.parse(req.body);
		const { accessToken, refreshToken, user } =
			await service.loginService(validateData);
		res.cookie("accessToken", accessToken, {
			...cookieOptions,
			maxAge: 15 * 60 * 1000,
		});

		res.cookie("refreshToken", refreshToken, {
			...cookieOptions,
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.USER_LOGGED,
			data: user,
		});
	} catch (error) {
		next(error);
	}
};

// logout user
export const logoutUser = async (
	req: any,
	res: Response,
	next: NextFunction,
) => {
	try {
		await service.logoutService(req.user.userId);
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.USER_LOGGED_OUT,
		});
	} catch (error) {
		next(error);
	}
};

// refresh token
export const refreshToken = async (
	req: any,
	res: Response,
	next: NextFunction,
) => {
	try {
		const token = req.cookies.refreshToken;
		const newAccess = await service.refreshTokenService(token);

		res.cookie("accessToken", newAccess, {
			httpOnly: true,
			secure: false,
			maxAge: 15 * 60 * 1000,
		});
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.REFRESH_TOKEN,
		});
	} catch (error) {
		next(error);
	}
};

// password forgot
export const forgotPassword = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await service.forgotPasswordService(req.body.email);
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.FORGET_PASSWORD,
			data: result,
		});
	} catch (error: any) {
		next(error);
	}
};

// password reset
export const resetPassword = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const validateData: ResetBody = resetSchema.parse(req.body);
		const result = await service.resetPasswordService(validateData);
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.PASSWORD_RESET_SUCCESSFULL,
			data: result,
		});
	} catch (error) {
		next(error);
	}
};
