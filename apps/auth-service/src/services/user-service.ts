import * as repo from "../repositories/auth-repository";

export const userService = async (
	name: string,
	email: string,
	phone: string,
	status: "active",
) => {
	const user = await repo.findUserByEmail(email);
	return user;
};
