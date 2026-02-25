import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.AUTH_SECRET as string;

export interface AuthRequest extends Request {
	user?: any;
}

export const authenticate = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.cookies.accessToken;
	if (!token) {
		return res.status(401).json({ message: "Token missing" });
	}
	try {
		const decoded = verifyAccessToken(token);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: "Invalid or expired token",
		});
	}
};
