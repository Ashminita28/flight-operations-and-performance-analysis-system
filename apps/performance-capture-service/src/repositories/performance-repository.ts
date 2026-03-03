import { FlightPerformance } from "@package/shared-database";
import { Flight } from "@package/shared-database";

export const FlightPerformanceRepository = {
	async findFlightById(id: string) {
		return await Flight.findByPk(id);
	},

	async findByFlightId(flightId: string) {
		return await FlightPerformance.findOne({ where: { flight_id: flightId } });
	},

	async create(data: any) {
		return await FlightPerformance.create(data);
	},

	async findAll() {
		return await FlightPerformance.findAll({ order: [["createdAt", "DESC"]] });
	},
};
