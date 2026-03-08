import { User } from "@package/shared-database";
import { Role } from "@package/shared-database";
import { Permission } from "@package/shared-database";

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
	return user?.dataValues;
};
