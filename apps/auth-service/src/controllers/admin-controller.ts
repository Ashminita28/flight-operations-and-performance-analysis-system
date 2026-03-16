import { NextFunction, Request, Response } from "express";
import { MESSAGES, sendResponse } from "@package/shared-utils";
import { HTTP_STATUS } from "@package/shared-utils";
import { findAllUsers } from "../repositories/auth-repository";

export const adminController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const users = await findAllUsers();
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.ALL_REGISTERED_USERS,
			data: users,
		});
	} catch (error) {
		next(error);
	}
};
