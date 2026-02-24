import { Aircraft } from "./aircraft";
import { AircraftMaintenance } from "./aircraft-maintenance";

Aircraft.hasMany(AircraftMaintenance, {
	foreignKey: "aircraft_id",
	as: "maintenance_records",
});

AircraftMaintenance.belongsTo(Aircraft, {
	foreignKey: "aircraft_id",
	as: "aircraft",
});

export { Aircraft, AircraftMaintenance };
