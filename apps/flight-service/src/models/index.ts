import Crew from "./crew";
import Flight from "./flight";
import FlightCrew from "./flight-crew";

Flight.belongsToMany(Crew, {
	through: FlightCrew,
	foreignKey: "flight_id",
	otherKey: "crew_id",
});

Crew.belongsToMany(Flight, {
	through: FlightCrew,
	foreignKey: "crew_id",
	otherKey: "flight_id",
});
