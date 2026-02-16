import { Request, Response } from "express";
import * as service from "../services/auth.service";
import Send from "../utils/response-utils";
import z from "zod";
import authSchema from "../validations/auth-schema";

// register user
export const registerUser = async (req: Request, res: Response) => {
	try {
		const result = await service.registerService(
			req.body as z.infer<typeof authSchema.register>,
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
		const result = await service.loginService(
			req.body as z.infer<typeof authSchema.login>,
		);
		return Send.success(res, result, "User logged in successfully");
	} catch (error) {
		console.error("Registration Failed:", error);
		return Send.error(res, null, "Registration Failed");
	}
};

// logout user
export const logoutUser = async (req: Request, res: Response) => {
	try {
		const result = await service.logoutService(req.body);
		return Send.success(res, result, "User logged out successfully");
	} catch (error) {
		console.error("Logout failed :", error);
		return Send.error(res, null, "Logout Failed");
	}
};

// refresh token
export const refreshToken = async (req: Request, res: Response) => {
	try {
		const result = await service.refreshTokenService(req.body);
		return Send.success(res, result, "rfresh token generated successfully");
	} catch (error) {
		console.error("No refresh Token:", error);
		return Send.error(res, null, "No refresh Token");
	}
};
