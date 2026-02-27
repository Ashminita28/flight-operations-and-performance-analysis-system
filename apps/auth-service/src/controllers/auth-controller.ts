import { Request, Response } from "express";
import * as service from "../services/auth-service";
import Send from "../validations/response";
import z from "zod";
import authSchema from "../validations/auth-schema";

// register user
export const registerUser = async (req: Request, res: Response) => {
	try {
		const { first_name, last_name, email, phone, password, roleName } =
			req.body;
		if (!first_name || !last_name || !email || !password) {
			return Send.badRequest(res, null, "Required fields missing");
		}
		const result = await service.registerService(
			first_name,
			last_name,
			email,
			phone,
			password,
			roleName,
		);
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

		if (!email || !password) {
			return Send.badRequest(res, null, "Email and password required");
		}
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
		console.error("Login Failed:", error);
		return Send.error(res, null, "Login Failed");
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
	try {
		const result = await service.forgotPasswordService(req.body.email);
		res.json(result);

		// return Send.success(res, result, "ok let me reset");
	} catch (error: any) {
		console.error("forgot password failed:", error);
		return Send.error(res, null, "forgot password failed");
	}
};

// password reset
export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { email, password, otp } = req.body;
		const result = await service.resetPasswordService(email, otp, password);
		res.json(result);
		// return Send.success(res, result, "password reset successfully");
	} catch (error: any) {
		console.error(" password reset failed:", error);
		return Send.error(res, null, " password reset failed");
	}
};
