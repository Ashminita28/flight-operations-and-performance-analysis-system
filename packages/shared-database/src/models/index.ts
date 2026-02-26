import { User } from "./user";
import { Role } from "./role";
import { Permission } from "./permission";
import { UserRole } from "./user-role";
import { RolePermission } from "./role-permission";

import { Aircraft } from "./aircraft";
import { AircraftMaintenance } from "./aircraft-maintenance";

import { Flight } from "./flight";
import { Crew } from "./crew";
import { FlightCrew } from "./flight-crew";
import { FlightEvent } from "./flight-event";

/* AUTH RELATIONS */

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

/* AIRCRAFT RELATIONS */

Aircraft.hasMany(AircraftMaintenance, {
	foreignKey: "aircraft_id",
});

AircraftMaintenance.belongsTo(Aircraft, {
	foreignKey: "aircraft_id",
});

/* FLIGHT RELATIONS */

Flight.belongsTo(Aircraft, {
	foreignKey: "aircraft_id",
});

Aircraft.hasMany(Flight, {
	foreignKey: "aircraft_id",
});

Flight.belongsToMany(Crew, {
	through: FlightCrew,
	foreignKey: "flight_id",
});

Crew.belongsToMany(Flight, {
	through: FlightCrew,
	foreignKey: "crew_id",
});

Flight.hasMany(FlightEvent, {
	foreignKey: "flight_id",
});

FlightEvent.belongsTo(Flight, {
	foreignKey: "flight_id",
});

export {
	User,
	Role,
	Permission,
	UserRole,
	RolePermission,
	Aircraft,
	AircraftMaintenance,
	Flight,
	Crew,
	FlightCrew,
	FlightEvent,
};
