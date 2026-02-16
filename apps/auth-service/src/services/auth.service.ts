import * as repo from "../repositories/auth-repository";
import bcrypt from "bcrypt";
import User from "../models/user";
import { generateAccessToken } from "../utils/jwt";

// 1.Registeration service
export const registerService = async (data: {
	email: string;
	password: string;
}) => {
	const { email, password } = data;
	const hash = await bcrypt.hash(data.password, 10);

	// 1.check if the email already exists in the database.
	const existing = await repo.findUserByEmail(data.email);
	if (existing) {
		throw new Error("User exists");
	}

	// 2.Hash the password using bcrypt.
	const hashedPassword = await bcrypt.hash(password, 10);

	// 3.create a new user in database with hashed password
	const user = await repo.createUser(data);

	return { user };
};

// 2.Login service
export const loginService = async (data: {
	email: string;
	password: string;
}) => {
	const { email, password } = data;

	//1. check if the email already exists in the database
	const user = await User.findOne({ where: { email } });
	if (!user) throw new Error("Invalid Credentials");

	// 2. compare the provided password with hashed password stored in the database
	// const isPasswordValid = await bcrypt.compare(password, user.password);
	// if (!isPasswordValid) {
	// 	throw new Error("Invalid credentials.");
	// }

	// 3.generate and access token.
	const accessToken = generateAccessToken({
		userId: user.id,
		email: user.email,
	});

	// 4.generate refresh token with a longer expiration time.
	// const refreshToken=jwt.sign({userId:user.id},authConfig.refresh_secret,{expires:authConfig.refresh_secret_expires_in as any});

	return {
		accessToken,
	};
};

// 3.Logout service
export const logoutService = async (data: {
	email: string;
	password: string;
}) => {
	// 1.Remove the refresh token from the database.
	const user = await repo.findUserByEmail(data.email);
	if (user) {
		await repo.updateUser(data);
	}
	return { user };
};

// 4.refresh token service
export const refreshTokenService = async (data: any) => {
	const user = await repo.findUserByEmail(data.email);

	if (!user) {
		throw new Error("Refresh token not found");
	}
};
