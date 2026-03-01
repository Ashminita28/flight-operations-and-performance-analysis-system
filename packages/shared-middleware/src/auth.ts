import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "./jwt";

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
		return res.status(401).json({
			message: "Not logged in",
		});
	}

	try {
		const decoded: any = verifyAccessToken(token);

		req.user = decoded;

		next();
	} catch (err) {
		return res.status(401).json({
			message: "Invalid token",
		});
	}
};
