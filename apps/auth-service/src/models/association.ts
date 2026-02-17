import Role from "./role";
import Permission from "./permission";
import User from "./user";

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

export { Role, Permission, User };
