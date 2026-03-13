import { describe, it, expect, vi, beforeEach } from "vitest";
import * as service from "../../src/services/flight-service";
import * as repo from "../../src/repositories/flights-repository";

vi.mock("../../src/repositories/flights-repository");

describe("Flight Service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("createFlightService", () => {
		it("should create flight successfully", async () => {
			const mockFlight = {
				id: "1",
				flight_number: "FL001",
				aircraft_id: "1",
				origin_airport: "NYC",
				destination_airport: "LAX",
			};

			const data = {
				flight_number: "FL001",
				aircraft_id: "1",
				origin_airport: "NYC",
				destination_airport: "LAX",
				scheduled_departure: "2025-04-01T10:00:00Z",
				scheduled_arrival: "2025-04-01T13:00:00Z",
				flight_date: "2025-04-01",
			};

			(repo.findAircraftByIdRepo as any).mockResolvedValue({ id: "1" });
			(repo.findOverlappingFlightRepo as any).mockResolvedValue(null);
			(repo.searchFlightRepo as any).mockResolvedValue([]);
			(repo.createFlightRepo as any).mockResolvedValue(mockFlight);

			const result = await service.createFlightService(data as any);

			expect(result).toEqual(mockFlight);
			expect(repo.createFlightRepo).toHaveBeenCalledWith(data);
		});

		it("should throw error if scheduled arrival <= departure", async () => {
			const data = {
				scheduled_arrival: "2025-04-01T10:00:00Z",
				scheduled_departure: "2025-04-01T13:00:00Z",
			};

			await expect(service.createFlightService(data as any)).rejects.toThrow();
		});

		it("should throw error if origin and destination airports are same", async () => {
			const data = {
				origin_airport: "NYC",
				destination_airport: "NYC",
				scheduled_departure: "2025-04-01T10:00:00Z",
				scheduled_arrival: "2025-04-01T13:00:00Z",
			};

			await expect(service.createFlightService(data as any)).rejects.toThrow();
		});

		it("should throw error if aircraft not found", async () => {
			const data = {
				aircraft_id: "invalid",
				origin_airport: "NYC",
				destination_airport: "LAX",
				scheduled_departure: "2025-04-01T10:00:00Z",
				scheduled_arrival: "2025-04-01T13:00:00Z",
			};

			(repo.findAircraftByIdRepo as any).mockResolvedValue(null);

			await expect(service.createFlightService(data as any)).rejects.toThrow();
		});

		it("should throw error if aircraft has overlapping flight", async () => {
			const data = {
				aircraft_id: "1",
				origin_airport: "NYC",
				destination_airport: "LAX",
				scheduled_departure: "2025-04-01T10:00:00Z",
				scheduled_arrival: "2025-04-01T13:00:00Z",
				flight_number: "FL001",
				flight_date: "2025-04-01",
			};

			(repo.findAircraftByIdRepo as any).mockResolvedValue({ id: "1" });
			(repo.findOverlappingFlightRepo as any).mockResolvedValue({
				id: "99",
			});

			await expect(service.createFlightService(data as any)).rejects.toThrow();
		});

		it("should throw error if flight number already exists for same date", async () => {
			const data = {
				aircraft_id: "1",
				origin_airport: "NYC",
				destination_airport: "LAX",
				scheduled_departure: "2025-04-01T10:00:00Z",
				scheduled_arrival: "2025-04-01T13:00:00Z",
				flight_number: "FL001",
				flight_date: "2025-04-01",
			};

			(repo.findAircraftByIdRepo as any).mockResolvedValue({ id: "1" });
			(repo.findOverlappingFlightRepo as any).mockResolvedValue(null);
			(repo.searchFlightRepo as any).mockResolvedValue([
				{ flight_date: "2025-04-01" },
			]);

			await expect(service.createFlightService(data as any)).rejects.toThrow();
		});

		it("should throw error if departure is in the past", async () => {
			const data = {
				aircraft_id: "1",
				origin_airport: "NYC",
				destination_airport: "LAX",
				scheduled_departure: "2020-04-01T10:00:00Z",
				scheduled_arrival: "2025-04-01T13:00:00Z",
				flight_number: "FL001",
				flight_date: "2020-04-01",
			};

			(repo.findAircraftByIdRepo as any).mockResolvedValue({ id: "1" });
			(repo.findOverlappingFlightRepo as any).mockResolvedValue(null);
			(repo.searchFlightRepo as any).mockResolvedValue([]);

			await expect(service.createFlightService(data as any)).rejects.toThrow();
		});
	});

	describe("getAllFlights", () => {
		it("should get all flights successfully", async () => {
			const mockResult = {
				flights: [{ id: "1", flight_number: "FL001" }],
				pagination: { total: 1, page: 1, limit: 20, total_pages: 1 },
			};
			const query = {};

			(repo.getAllFlightsRepo as any).mockResolvedValue(mockResult);

			const result = await service.getAllFlights(query as any);

			expect(result).toEqual(mockResult);
			expect(repo.getAllFlightsRepo).toHaveBeenCalledWith(query);
		});

		it("should handle error when fetching flights", async () => {
			const error = new Error("Database error");
			(repo.getAllFlightsRepo as any).mockRejectedValue(error);

			await expect(service.getAllFlights({} as any)).rejects.toThrow(
				"Database error",
			);
		});
	});

	describe("getFlightById", () => {
		it("should get flight by id successfully", async () => {
			const mockFlight = { id: "1", flight_number: "FL001" };

			(repo.getFlightByIdRepo as any).mockResolvedValue(mockFlight);

			const result = await service.getFlightById("1");

			expect(result).toEqual(mockFlight);
			expect(repo.getFlightByIdRepo).toHaveBeenCalledWith("1");
		});

		it("should return null when flight not found", async () => {
			(repo.getFlightByIdRepo as any).mockResolvedValue(null);

			const result = await service.getFlightById("invalid-id");

			expect(result).toBeNull();
		});
	});

	describe("updateFlight", () => {
		it("should update flight successfully", async () => {
			const mockFlight = { id: "1", flight_number: "FL001", status: "delayed" };
			const updateData = { status: "delayed" };

			(repo.updateFlightRepo as any).mockResolvedValue(mockFlight);

			const result = await service.updateFlight("1", updateData as any);

			expect(result).toEqual(mockFlight);
			expect(repo.updateFlightRepo).toHaveBeenCalledWith("1", updateData);
		});

		it("should handle update error", async () => {
			const error = new Error("Update failed");
			(repo.updateFlightRepo as any).mockRejectedValue(error);

			await expect(service.updateFlight("1", {} as any)).rejects.toThrow(
				"Update failed",
			);
		});
	});

	describe("updateFlightStatusService", () => {
		it("should update flight status successfully", async () => {
			const mockFlight = { id: "1", status: "scheduled" };
			const newStatus = "in_flight";

			(repo.getFlightByIdRepo as any).mockResolvedValue(mockFlight);
			(repo.updateFlightStatusRepo as any).mockResolvedValue({
				...mockFlight,
				status: newStatus,
			});

			const result = await service.updateFlightStatusService("1", newStatus);

			expect(repo.updateFlightStatusRepo).toHaveBeenCalledWith("1", newStatus);
		});

		it("should throw error when flight not found", async () => {
			(repo.getFlightByIdRepo as any).mockResolvedValue(null);

			await expect(
				service.updateFlightStatusService("invalid-id", "in_flight"),
			).rejects.toThrow();
		});

		it("should throw error for invalid status transition", async () => {
			const mockFlight = { id: "1", status: "completed" };

			(repo.getFlightByIdRepo as any).mockResolvedValue(mockFlight);

			// Assuming completed cannot transition to scheduled
			await expect(
				service.updateFlightStatusService("1", "scheduled"),
			).rejects.toThrow();
		});
	});

	describe("searchFlight", () => {
		it("should search flight by number successfully", async () => {
			const mockFlights = [{ id: "1", flight_number: "FL001" }];

			(repo.searchFlightRepo as any).mockResolvedValue(mockFlights);

			const result = await service.searchFlight("FL001");

			expect(result).toEqual(mockFlights);
			expect(repo.searchFlightRepo).toHaveBeenCalledWith("FL001");
		});

		it("should return empty array when no flights found", async () => {
			(repo.searchFlightRepo as any).mockResolvedValue([]);

			const result = await service.searchFlight("INVALID");

			expect(result).toEqual([]);
		});
	});

	describe("deleteFlight", () => {
		it("should delete flight successfully", async () => {
			(repo.deleteFlightRepo as any).mockResolvedValue(true);

			await service.deleteFlight("1");

			expect(repo.deleteFlightRepo).toHaveBeenCalledWith("1");
		});

		it("should handle delete error", async () => {
			const error = new Error("Delete failed");
			(repo.deleteFlightRepo as any).mockRejectedValue(error);

			await expect(service.deleteFlight("1")).rejects.toThrow("Delete failed");
		});
	});

	describe("getTodaysFlights", () => {
		it("should get today's flights successfully", async () => {
			const mockFlights = [
				{ id: "1", flight_number: "FL001", flight_date: "2025-03-12" },
			];

			(repo.getTodaysFlightsRepo as any).mockResolvedValue(mockFlights);

			const result = await service.getTodaysFlights();

			expect(result).toEqual(mockFlights);
			expect(repo.getTodaysFlightsRepo).toHaveBeenCalled();
		});

		it("should return empty array when no flights today", async () => {
			(repo.getTodaysFlightsRepo as any).mockResolvedValue([]);

			const result = await service.getTodaysFlights();

			expect(result).toEqual([]);
		});

		it("should handle error when fetching today's flights", async () => {
			const error = new Error("Query failed");
			(repo.getTodaysFlightsRepo as any).mockRejectedValue(error);

			await expect(service.getTodaysFlights()).rejects.toThrow("Query failed");
		});
	});
});
