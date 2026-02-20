import * as repo from "../repositories/auth-repository";

export const userService = async (userId: string) => {
	const user = await repo.findUserProfile(userId);
	if (!user) throw new Error("User not found");
	return user;
};
