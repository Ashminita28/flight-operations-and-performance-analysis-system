import User from "../models/user";
import Role from "../models/role";
import Permission from "../models/permission";

export const findUserByEmailWithRoles = async (email: string) => {
	const user = await User.findOne({
		where: { email },
		include: [
			{
				model: Role,
				include: [Permission],
			},
		],
	});
	console.log("hfjdhfd:", user?.dataValues);
	return user?.dataValues;
};
