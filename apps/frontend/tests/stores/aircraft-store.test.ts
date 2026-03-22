import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAircraftStore } from "../../src/store/aircraft-store";
import { aircraftService } from "../../src/services/aircraft-service";
import type {
	Aircraft,
	CreateAircraftDto,
} from "../../src/types/aircraft-types";

vi.mock("@/services/aircraft-service", () => ({
	aircraftService: {
		getAll: vi.fn(),
		create: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	},
}));

const mockAircraft: Aircraft[] = [
	{ id: "1", registration: "ABC123", model: "A320" },
];

const mockCreateDto: CreateAircraftDto = {
	registration: "ABC123",
	icao_type: "A320",
	manufacturer: "Airbus",
	model: "A320",
	seat_capacity: 180,
	fuel_capacity_kg: 20000,
	max_payload_kg: 16000,
	year_of_manufacture: 2020,
	status: "active",
	base_airport_code: "DEL",
};

describe("Aircraft Store", () => {
	beforeEach(() => {
		useAircraftStore.setState({
			aircraft: [],
			loading: false,
			error: null,
		});
		vi.clearAllMocks();
	});

	it("fetchAircraft success", async () => {
		vi.mocked(aircraftService.getAll).mockResolvedValue(mockAircraft);

		await useAircraftStore.getState().fetchAircraft();

		const state = useAircraftStore.getState();

		expect(state.aircraft).toEqual(mockAircraft);
		expect(state.loading).toBe(false);
		expect(state.error).toBeNull();
	});

	it("fetchAircraft error", async () => {
		vi.mocked(aircraftService.getAll).mockRejectedValue(new Error("fail"));

		await useAircraftStore.getState().fetchAircraft();

		const state = useAircraftStore.getState();

		expect(state.error).toBe("fail");
		expect(state.loading).toBe(false);
	});

	it("createAircraft success", async () => {
		vi.mocked(aircraftService.create).mockResolvedValue(mockAircraft[0]);
		vi.mocked(aircraftService.getAll).mockResolvedValue(mockAircraft);

		await useAircraftStore.getState().createAircraft(mockCreateDto);

		const state = useAircraftStore.getState();

		expect(aircraftService.create).toHaveBeenCalledWith(mockCreateDto);
		expect(state.aircraft).toEqual(mockAircraft);
	});
});
