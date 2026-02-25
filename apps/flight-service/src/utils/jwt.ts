import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.AUTH_SECRET || "secret";
const REFRESH_SECRET = process.env.AUTH_REFRESH_SECRET || "refresh";
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

// generate access token
export const generateAccessToken = (payload: { userId: string }) => {
	return jwt.sign(payload, ACCESS_SECRET, {
		expiresIn: ACCESS_TOKEN_EXPIRY,
	});
};

// generate refresh token
export const generateRefreshToken = (payload: { userId: string }) => {
	return jwt.sign(payload, REFRESH_SECRET, {
		expiresIn: REFRESH_TOKEN_EXPIRY,
	});
};

// verify access token
export const verifyAccessToken = (token: string) => {
	return jwt.verify(token, ACCESS_SECRET);
};

// verify refresh token
export const verifyRefreshToken = (token: string) => {
	return jwt.verify(token, REFRESH_SECRET);
};
