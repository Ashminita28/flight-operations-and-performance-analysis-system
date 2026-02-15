import * as repo from "../repositories/auth-repository";
// import {generateToken,compareToken} from "shared-utils";

export const register = async (data: any) => {
	const existing = await repo.findUserByEmail(data.email);
	if (existing) {
		throw new Error("User exists");
	}

	const user = await repo.createUser(data);

	// const token=generateToken({userId:user.id},"secret","24h");

	return { user };
};

export const login = async (data: any) => {
	const user = await repo.findUserByEmail(data.email);
	if (!user) throw new Error("Invalid Credentials");

	// const token=generateToken({userId:user.id},"secret","24h");

	return { user };
};
