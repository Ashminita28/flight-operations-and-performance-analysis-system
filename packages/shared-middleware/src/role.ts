import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";

export const authorizeRole = (...roles: string[]) => {
	return (req: AuthRequest, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json({
				message: "Unauthorized",
			});
		}
		const userRoles = req.user?.roles || [];
		const hasAccess = userRoles.some(r => roles.includes(r));

		if (!hasAccess) {
			return res.status(403).json({
				message: "Forbidden",
			});
		}

		next();
	};
};
