import { describe, it, expect, vi, beforeEach } from "vitest";
import * as repo from "../../src/repositories/flights-repository";
import { Flight, Aircraft } from "@package/shared-database";

vi.mock("@package/shared-database");

describe("Flight Repository", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("createFlightRepo", () => {
		it("should create flight in database", async () => {
			const mockFlight = {
				id: "1",
				flight_number: "FL001",
				aircraft_id: "1",
			};
			const data = {
				flight_number: "FL001",
				aircraft_id: "1",
				origin_airport: "NYC",
				destination_airport: "LAX",
			};

			(Flight.create as any).mockResolvedValue(mockFlight);

			const result = await repo.createFlightRepo(data as any);

			expect(result).toEqual(mockFlight);
			expect(Flight.create).toHaveBeenCalledWith(data);
		});

		it("should handle create error", async () => {
			const error = new Error("Database error");
			(Flight.create as any).mockRejectedValue(error);

			await expect(repo.createFlightRepo({} as any)).rejects.toThrow(
				"Database error",
			);
		});
	});

	describe("getAllFlightsRepo", () => {
		it("should get all flights with default pagination", async () => {
			const mockResult = { count: 0, rows: [] };

			(Flight.findAndCountAll as any).mockResolvedValue(mockResult);

			const result = await repo.getAllFlightsRepo({});

			expect(result).toBeDefined();
			expect(Flight.findAndCountAll).toHaveBeenCalledWith(
				expect.objectContaining({
					limit: 20,
					offset: 0,
				}),
			);
		});

		it("should apply pagination with custom page and limit", async () => {
			const mockResult = { count: 0, rows: [] };
			const query = { page: "2", limit: "30" };

			(Flight.findAndCountAll as any).mockResolvedValue(mockResult);

			const result = await repo.getAllFlightsRepo(query as any);

			expect(Flight.findAndCountAll).toHaveBeenCalledWith(
				expect.objectContaining({
					limit: 30,
					offset: 30,
				}),
			);
		});

		it("should filter by flight number", async () => {
			const mockResult = { count: 0, rows: [] };
			const query = { flight_number: "FL001" };

			(Flight.findAndCountAll as any).mockResolvedValue(mockResult);

			const result = await repo.getAllFlightsRepo(query as any);

			expect(Flight.findAndCountAll).toHaveBeenCalledWith(
				expect.objectContaining({
					where: expect.objectContaining({
						flight_number: expect.any(Object),
					}),
				}),
			);
		});

		it("should filter by status", async () => {
			const mockResult = { count: 0, rows: [] };
			const query = { status: "scheduled" };

			(Flight.findAndCountAll as any).mockResolvedValue(mockResult);

			await repo.getAllFlightsRepo(query as any);

			expect(Flight.findAndCountAll).toHaveBeenCalledWith(
				expect.objectContaining({
					where: expect.objectContaining({
						status: "scheduled",
					}),
				}),
			);
		});

		it("should filter by airports", async () => {
			const mockResult = { count: 0, rows: [] };
			const query = { origin_airport: "nyc", destination_airport: "lax" };

			(Flight.findAndCountAll as any).mockResolvedValue(mockResult);

			await repo.getAllFlightsRepo(query as any);

			expect(Flight.findAndCountAll).toHaveBeenCalledWith(
				expect.objectContaining({
					where: expect.objectContaining({
						origin_airport: "NYC",
						destination_airport: "LAX",
					}),
				}),
			);
		});

		it("should filter by date", async () => {
			const mockResult = { count: 0, rows: [] };
			const query = { date: "2025-04-01" };

			(Flight.findAndCountAll as any).mockResolvedValue(mockResult);

			await repo.getAllFlightsRepo(query as any);

			expect(Flight.findAndCountAll).toHaveBeenCalledWith(
				expect.objectContaining({
					where: expect.objectContaining({
						flight_date: "2025-04-01",
					}),
				}),
			);
		});

		it("should sort by date when sort_by is date", async () => {
			const mockResult = { count: 0, rows: [] };
			const query = { sort_by: "date", sort_order: "DESC" };

			(Flight.findAndCountAll as any).mockResolvedValue(mockResult);

			await repo.getAllFlightsRepo(query as any);

			expect(Flight.findAndCountAll).toHaveBeenCalledWith(
				expect.objectContaining({
					order: expect.any(Array),
				}),
			);
		});

		it("should handle query error", async () => {
			const error = new Error("Query failed");
			(Flight.findAndCountAll as any).mockRejectedValue(error);

			await expect(repo.getAllFlightsRepo({} as any)).rejects.toThrow(
				"Query failed",
			);
		});
	});

	describe("getFlightByIdRepo", () => {
		it("should get flight by id successfully", async () => {
			const mockFlight = { id: "1", flight_number: "FL001" };

			(Flight.findByPk as any).mockResolvedValue(mockFlight);

			const result = await repo.getFlightByIdRepo("1");

			expect(result).toEqual(mockFlight);
			expect(Flight.findByPk).toHaveBeenCalledWith("1");
		});

		it("should return null when flight not found", async () => {
			(Flight.findByPk as any).mockResolvedValue(null);

			const result = await repo.getFlightByIdRepo("invalid-id");

			expect(result).toBeNull();
		});
	});

	describe("updateFlightRepo", () => {
		it("should update flight successfully", async () => {
			const mockFlight = {
				id: "1",
				flight_number: "FL001",
				update: vi.fn().mockResolvedValue({ status: "delayed" }),
			};
			const updateData = { status: "delayed" };

			(Flight.findByPk as any).mockResolvedValue(mockFlight);

			const result = await repo.updateFlightRepo("1", updateData as any);

			expect(mockFlight.update).toHaveBeenCalledWith(updateData);
		});

		it("should return null when flight not found", async () => {
			(Flight.findByPk as any).mockResolvedValue(null);

			const result = await repo.updateFlightRepo("invalid-id", {} as any);

			expect(result).toBeNull();
		});
	});

	describe("updateFlightStatusRepo", () => {
		it("should update flight status successfully", async () => {
			const mockFlight = {
				id: "1",
				update: vi.fn().mockResolvedValue({ status: "in_flight" }),
			};

			(Flight.findByPk as any).mockResolvedValue(mockFlight);

			const result = await repo.updateFlightStatusRepo("1", "in_flight");

			expect(mockFlight.update).toHaveBeenCalledWith({ status: "in_flight" });
		});

		it("should return null when flight not found", async () => {
			(Flight.findByPk as any).mockResolvedValue(null);

			const result = await repo.updateFlightStatusRepo("invalid-id", "active");

			expect(result).toBeNull();
		});
	});

	describe("deleteFlightRepo", () => {
		it("should delete flight successfully", async () => {
			const mockFlight = {
				id: "1",
				destroy: vi.fn().mockResolvedValue(undefined),
			};

			(Flight.findByPk as any).mockResolvedValue(mockFlight);

			const result = await repo.deleteFlightRepo("1");

			expect(mockFlight.destroy).toHaveBeenCalled();
		});

		it("should return null when flight not found", async () => {
			(Flight.findByPk as any).mockResolvedValue(null);

			const result = await repo.deleteFlightRepo("invalid-id");

			expect(result).toBeNull();
		});
	});

	describe("getTodaysFlightsRepo", () => {
		it("should get today's flights successfully", async () => {
			const mockFlights = [
				{ id: "1", flight_number: "FL001", flight_date: "2025-03-12" },
			];

			(Flight.findAll as any).mockResolvedValue(mockFlights);

			const result = await repo.getTodaysFlightsRepo();

			expect(result).toEqual(mockFlights);
			expect(Flight.findAll).toHaveBeenCalledWith(
				expect.objectContaining({
					where: expect.objectContaining({
						flight_date: expect.any(String),
					}),
				}),
			);
		});

		it("should return empty array when no flights today", async () => {
			(Flight.findAll as any).mockResolvedValue([]);

			const result = await repo.getTodaysFlightsRepo();

			expect(result).toEqual([]);
		});
	});

	describe("searchFlightRepo", () => {
		it("should search flight by number successfully", async () => {
			const mockFlights = [{ id: "1", flight_number: "FL001" }];

			(Flight.findAll as any).mockResolvedValue(mockFlights);

			const result = await repo.searchFlightRepo("FL001");

			expect(result).toEqual(mockFlights);
			expect(Flight.findAll).toHaveBeenCalledWith(
				expect.objectContaining({
					where: expect.objectContaining({
						flight_number: expect.any(Object),
					}),
				}),
			);
		});

		it("should return empty array when no flights found", async () => {
			(Flight.findAll as any).mockResolvedValue([]);

			const result = await repo.searchFlightRepo("INVALID");

			expect(result).toEqual([]);
		});
	});

	describe("findOverlappingFlightRepo", () => {
		it("should find overlapping flight successfully", async () => {
			const mockFlight = {
				id: "1",
				flight_number: "FL001",
				aircraft_id: "1",
			};

			(Flight.findOne as any).mockResolvedValue(mockFlight);

			const result = await repo.findOverlappingFlightRepo(
				"1",
				"2025-04-01T10:00:00Z",
				"2025-04-01T13:00:00Z",
			);

			expect(result).toEqual(mockFlight);
			expect(Flight.findOne).toHaveBeenCalled();
		});

		it("should return null when no overlap", async () => {
			(Flight.findOne as any).mockResolvedValue(null);

			const result = await repo.findOverlappingFlightRepo(
				"1",
				"2025-04-01T10:00:00Z",
				"2025-04-01T13:00:00Z",
			);

			expect(result).toBeNull();
		});
	});

	describe("findAircraftByIdRepo", () => {
		it("should find aircraft by id successfully", async () => {
			const mockAircraft = { id: "1", registration: "N12345" };

			(Aircraft.findByPk as any).mockResolvedValue(mockAircraft);

			const result = await repo.findAircraftByIdRepo("1");

			expect(result).toEqual(mockAircraft);
			expect(Aircraft.findByPk).toHaveBeenCalledWith("1");
		});

		it("should return null when aircraft not found", async () => {
			(Aircraft.findByPk as any).mockResolvedValue(null);

			const result = await repo.findAircraftByIdRepo("invalid-id");

			expect(result).toBeNull();
		});
	});
});
