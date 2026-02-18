import { Request, Response } from "express";
import * as service from "../services/user-service";
import Send from "../utils/response-utils";
// import User from "../models/user";

export const getUserProfile = async (req: Request, res: Response) => {
	try {
		const { name, email, phone, status } = req.body;
		const result = await service.userService(name, email, phone, status);
		return Send.success(res, result, "Your profile is here");
	} catch (error) {
		return Send.error(res, null, "No profile found");
	}
};
