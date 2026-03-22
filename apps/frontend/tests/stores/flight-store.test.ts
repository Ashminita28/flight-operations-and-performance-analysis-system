import { describe, it, expect, beforeEach, vi } from "vitest";
import { useFlightStore } from "../../src/store/flight-store";
import { flightService } from "../../src/services/flight-service";
import type { FlightsApiResponse } from "../../src/types/flight-types";

vi.mock("../../src/services/flight-service");

describe("Flight Store", () => {
	beforeEach(() => {
		useFlightStore.setState({
			flights: [],
			selectedFlight: null,
			aircraftMap: {},
			pagination: { total: 0, page: 1, limit: 10, total_pages: 1 },
			filters: { page: 1, limit: 10 },
			loading: false,
			error: null,
		});

		vi.clearAllMocks();
	});

	it("fetchFlights success", async () => {
		const response: FlightsApiResponse = {
			success: true,
			data: [
				{
					id: "1",
					flight_number: "AI101",
					airline_code: "AI",
					origin_airport: "DEL",
					destination_airport: "BOM",
					aircraft_id: "1",
					status: "scheduled",
					scheduled_departure: "",
					scheduled_arrival: "",
					estimated_departure: null,
					estimated_arrival: null,
					actual_departure: null,
					actual_arrival: null,
					gate_departure: null,
					gate_arrival: null,
					flight_date: "",
					is_return_flight: false,
					created_by: null,
				},
			],
			pagination: { total: 1, page: 1, limit: 10, total_pages: 1 },
		};

		vi.mocked(flightService.getAll).mockResolvedValue(response);

		await useFlightStore.getState().fetchFlights();

		expect(useFlightStore.getState().flights.length).toBe(1);
	});
});
