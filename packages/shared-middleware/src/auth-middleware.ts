import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "./jwt";
import { HTTP_STATUS, MESSAGES, sendResponse } from "@package/shared-utils";

export interface AuthRequest extends Request {
	user?: {
		userId: string;
		roles: string[];
	};
}

export const authenticate = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.cookies.accessToken;

	if (!token) {
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.UNAUTHORIZED,
			success: false,
			message: "Not logged in",
		});
	}

	try {
		const decoded: any = verifyAccessToken(token);

		req.user = decoded;

		next();
	} catch (err) {
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.UNAUTHORIZED,
			success: false,
			message: "Invalid token",
		});
	}
};
