import { Request, Response } from "express";
import * as service from "../services/auth.service";
import * as emailService from "../services/email-service";
import Send from "../utils/response-utils";
import z from "zod";
import authSchema from "../validations/auth-schema";

// register user
export const registerUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body as z.infer<
			typeof authSchema.register
		>;
		const result = await service.registerService(name, email, password);
		return Send.success(res, result, "User successfully registered.");
	} catch (error: any) {
		console.error("REGISTER ERROR:", error);
		return Send.error(res, null, "Registration Failed");
	}
};

// login user
export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body as z.infer<typeof authSchema.login>;
		const { accessToken, refreshToken, user } = await service.loginService(
			email,
			password,
		);

		// set cookies
		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: false,
			maxAge: 15 * 60 * 1000,
		});
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: false,
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		return Send.success(res, user, "User logged in successfully");
	} catch (error) {
		console.error("Registration Failed:", error);
		return Send.error(res, null, "Registration Failed");
	}
};

// logout user
export const logoutUser = async (req: any, res: Response) => {
	try {
		await service.logoutService(req.user.userId);
		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		return Send.success(res, "User logged out successfully");
	} catch (error) {
		console.error("error in logging out:", error);
		return Send.error(res, null, "couldn't logout");
	}
};

// refresh token
export const refreshToken = async (req: any, res: Response) => {
	try {
		const token = req.cookies.refreshToken;
		const newAccess = await service.refreshTokenService(token);

		res.cookie("accessToken", newAccess, {
			httpOnly: true,
			secure: false,
			maxAge: 15 * 60 * 1000,
		});
		return Send.success(res, " success refresh token ");
	} catch (error) {
		console.error("Invalid refresh token:", error);
		return Send.error(res, null, "Invalid refresh token");
	}
};

// password forgot
export const forgotPassword = async (req: Request, res: Response) => {
	const result = await emailService.forgotPasswordService(req.body.email);
	res.json(result);
};

// password reset
export const resetPassword = async (req: Request, res: Response) => {
	const { email, password, otp } = req.body;
	const result = await emailService.resetPasswordService(email, password, otp);
	res.json(result);
};
