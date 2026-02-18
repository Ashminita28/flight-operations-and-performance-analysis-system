import Role from "../models/role";

// get role by its role name
export const findRoleByName = async (role: string) => {
	return Role.findOne({ where: { role } });
};
