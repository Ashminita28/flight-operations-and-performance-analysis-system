import { ApiError, HTTP_STATUS, MESSAGES } from "@package/shared-utils";
import * as repo from "../repositories/auth-repository";

export const userService = async (userId: string) => {
	const user = await repo.findUserProfile(userId);
	if (!user) throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.USER_NOT_FOUND);
	return user;
};
