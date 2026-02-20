import Role from "./role";
import Permission from "./permission";
import User from "./user";
import UserRole from "./user-role";
import RolePermission from "./role-permission";

User.belongsToMany(Role, {
	through: UserRole,
	foreignKey: "user_id",
	otherKey: "role_id",
});
Role.belongsToMany(User, {
	through: UserRole,
	foreignKey: "role_id",
	otherKey: "user_id",
});

Role.belongsToMany(Permission, {
	through: RolePermission,
	foreignKey: "role_id",
	otherKey: "permission_id",
});
Permission.belongsToMany(Role, {
	through: RolePermission,
	foreignKey: "permission_id",
	otherKey: "role_id",
});

export { Role, Permission, User };
