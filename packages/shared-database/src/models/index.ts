import { Role } from "./role";
import { Permission } from "./permission";
import { RolePermission } from "./role-permission";
import { UserRole } from "./user-role";
import { User } from "./user";
import { PasswordReset } from "./password-reset";
import { RefreshToken } from "./refresh-token";
import { Airport } from "./airport";
import { Aircraft } from "./aircraft";
import { Flight } from "./flight";
import { FlightStatusHistory } from "./flight-status-history";

export function setupAssociations() {
	User.belongsToMany(Role, {
		through: UserRole,
		foreignKey: "user_id",
	});

	Role.belongsToMany(User, {
		through: UserRole,
		foreignKey: "role_id",
	});

	Role.belongsToMany(Permission, {
		through: RolePermission,
		foreignKey: "role_id",
	});

	Permission.belongsToMany(Role, {
		through: RolePermission,
		foreignKey: "permission_id",
	});

	Aircraft.hasMany(Flight, { foreignKey: "aircraft_id" });
	Flight.belongsTo(Aircraft, { foreignKey: "aircraft_id" });

	Airport.hasMany(Flight, {
		foreignKey: "origin_airport",
		as: "originFlights",
	});

	Airport.hasMany(Flight, {
		foreignKey: "destination_airport",
		as: "destinationFlights",
	});

	Flight.belongsTo(Airport, {
		foreignKey: "origin_airport",
		as: "origin",
	});

	Flight.belongsTo(Airport, {
		foreignKey: "destination_airport",
		as: "destination",
	});

	Flight.hasMany(FlightStatusHistory, {
		foreignKey: "flight_id",
		as: "statusHistory",
	});

	FlightStatusHistory.belongsTo(Flight, {
		foreignKey: "flight_id",
		as: "flight",
	});
}

export {
	Role,
	RolePermission,
	User,
	UserRole,
	PasswordReset,
	RefreshToken,
	Aircraft,
	Airport,
	Flight,
	FlightStatusHistory,
};
