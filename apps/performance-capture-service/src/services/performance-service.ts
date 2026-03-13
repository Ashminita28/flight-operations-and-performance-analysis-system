import { FlightPerformanceRepository } from "../repositories/performance-repository";
import { ApiError, HTTP_STATUS, MESSAGES } from "@package/shared-utils";

export const FlightPerformanceService = {
	async createPerformance(data: {
		flight_id: string;
		fuel_used_kg: number;
		distance_km: number;
		passengers_count: number;
		payload_kg: number;
		flight_time_minutes: number;
	}) {
		const flight = await FlightPerformanceRepository.findFlightById(
			data.flight_id,
		);

		if (!flight) {
			throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.FLIGHT_NOT_FOUND);
		}

		if (flight.status !== "landed") {
			throw new ApiError(
				HTTP_STATUS.BAD_REQUEST,
				MESSAGES.PERFORMANCE_RECORD_FOR_LANDED_FLIGHT,
			);
		}

		const existing = await FlightPerformanceRepository.findByFlightId(
			data.flight_id,
		);

		if (existing) {
			throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.PERFORMANCE_EXISTS);
		}

		const fuel_efficiency_kg_per_km = data.fuel_used_kg / data.distance_km;

		const load_factor_pct = (data.passengers_count / 180) * 100;

		const co2_emissions_kg = data.fuel_used_kg * 3.16;

		const average_speed = data.distance_km / (data.flight_time_minutes / 60);

		return await FlightPerformanceRepository.create({
			...data,
			fuel_efficiency_kg_per_km: Number(fuel_efficiency_kg_per_km.toFixed(2)),
			load_factor_pct: Number(load_factor_pct.toFixed(2)),
			co2_emissions_kg: Number(co2_emissions_kg.toFixed(2)),
			average_speed: Number(average_speed.toFixed(2)),
		});
	},

	async getAllPerformance() {
		return await FlightPerformanceRepository.findAll();
	},

	async getFlightPerformanceById(id: string) {
		return await FlightPerformanceRepository.findByFlightId(id);
	},
};
