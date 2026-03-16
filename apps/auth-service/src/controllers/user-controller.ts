import { NextFunction, Request, Response } from "express";
import * as service from "../services/user-service";
import { HTTP_STATUS, MESSAGES, sendResponse } from "@package/shared-utils";

export const getUserProfile = async (
	req: any,
	res: Response,
	next: NextFunction,
) => {
	try {
		const user = await service.userService(req.user.userId);
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.USER_PROFILE,
			data: user,
		});
	} catch (error) {
		next(error);
	}
};
