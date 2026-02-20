import { Request, Response } from "express";
import * as service from "../services/user-service";
import Send from "../utils/response-utils";
// import User from "../models/user";

export const getUserProfile = async (req: any, res: Response) => {
	try {
		const user = await service.userService(req.user.userId);
		return Send.success(res, user, "Your profile is here");
	} catch (error) {
		return Send.error(res, null, "No profile found");
	}
};
