import { Role } from "@package/shared-database";
import { User } from "@package/shared-database";

export const findUserByEmail = async (email: string) => {
	const user = await User.findOne({ where: { email } });
	console.log("hfjdhfd:", user);
	return user?.dataValues;
};

export const findUserProfile = async (id: string) => {
	const user = await User.findByPk(id, {
		include: [{ model: Role, attributes: ["name"] }],
		attributes: { exclude: ["password", "refreshToken"] },
	});
	return user?.dataValues;
};
export const createUser = async (data: any) => {
	const user = await User.create(data);
	console.log("hiiiiheloo:", user);
	return user?.dataValues;
};

export const findUserById = async (id: string) => {
	const user = await User.findByPk(id);
	console.log("hiiiiheloo:", user);
	return user?.dataValues;
};

export const findAllUsers = async () => {
	const user = await User.findAll();
	console.log("hiiiiheloo:", user);
	return user;
};

export const updateUser = async (data: any) => {
	const user = await User.destroy(data);
	console.log("hiiiiheloo:", user);
	return user;
};

export const saveRefreshToken = async (id: string, token: string) => {
	const user = await User.update({ refresh_token: token }, { where: { id } });
	console.log("saved token:", user);
	return user;
};
