import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UUID } from "node:crypto";
dotenv.config();

const JWT_SECRET = process.env.AUTH_SECRET as string;
const ACCESS_TOKEN_EXPIRY = "1h";

export const generateAccessToken = (payload: {
	userId: string;
	email: string;
}) => {
	return jwt.sign(payload, JWT_SECRET, {
		expiresIn: ACCESS_TOKEN_EXPIRY,
	});
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, JWT_SECRET);
};
