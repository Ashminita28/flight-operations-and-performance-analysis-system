import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth-middleware";
import { HTTP_STATUS, MESSAGES, sendResponse } from "@package/shared-utils";

export const authorizeRole = (...roles: string[]) => {
	return (req: AuthRequest, res: Response, next: NextFunction) => {
		if (!req.user) {
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.UNAUTHORIZED,
				success: false,
				message: "Unauthorized",
			});
		}
		const userRoles = req.user?.roles || [];
		const hasAccess = userRoles.some(r => roles.includes(r));

		if (!hasAccess) {
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.FORBIDDEN,
				success: false,
				message: "Forbidden",
			});
		}

		next();
	};
};
