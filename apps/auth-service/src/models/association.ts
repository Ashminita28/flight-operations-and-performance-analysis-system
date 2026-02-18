import Role from "./role";
import Permission from "./permission";
import User from "./user";

User.belongsToMany(Role, {
	through: "UserRoles",
	foreignKey: "user_id",
	otherKey: "role_id",
});
Role.belongsToMany(User, {
	through: "UserRoles",
	foreignKey: "role_id",
	otherKey: "user_id",
});

Role.belongsToMany(Permission, {
	through: "role_permissions",
	foreignKey: "role_id",
	otherKey: "permission_id",
});
Permission.belongsToMany(Role, {
	through: "role_permissions",
	foreignKey: "permission_id",
	otherKey: "role_id",
});

export { Role, Permission, User };
