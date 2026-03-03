import { FlightPerformanceRepository } from "../repositories/performance-repository";
import { ApiError } from "@package/shared-utils";

export const FlightPerformanceService = {
	async createPerformance(data: {
		flight_id: string;
		fuel_used_kg: number;
		distance_km: number;
		passengers_count: number;
		payload_kg: number;
	}) {
		const flight = await FlightPerformanceRepository.findFlightById(
			data.flight_id,
		);

		if (!flight) {
			throw new ApiError(404, "Flight not found");
		}

		if (flight.status !== "scheduled") {
			throw new ApiError(
				400,
				"Performance can only be recorded for completed flights",
			);
		}

		const existing = await FlightPerformanceRepository.findByFlightId(
			data.flight_id,
		);

		if (existing) {
			throw new ApiError(
				409,
				"Performance record already exists for this flight",
			);
		}

		const fuel_efficiency = data.fuel_used_kg / data.distance_km;

		const load_factor_pct = (data.passengers_count / data.payload_kg) * 100;

		const co2_emissions_kg = data.fuel_used_kg * 3.16;

		return await FlightPerformanceRepository.create({
			...data,
			fuel_efficiency: Number(fuel_efficiency.toFixed(2)),
			load_factor_pct: Number(load_factor_pct.toFixed(2)),
			co2_emissions_kg: Number(co2_emissions_kg.toFixed(2)),
		});
	},

	async getAllPerformance() {
		return await FlightPerformanceRepository.findAll();
	},
};
