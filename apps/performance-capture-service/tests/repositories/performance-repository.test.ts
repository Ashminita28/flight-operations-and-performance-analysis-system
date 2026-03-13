import { describe, it, expect, vi, beforeEach } from "vitest";
import { FlightPerformanceRepository } from "../../src/repositories/performance-repository";
import { FlightPerformance, Flight } from "@package/shared-database";

vi.mock("@package/shared-database");

describe("Flight Performance Repository", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("findFlightById", () => {
		it("should find flight by id successfully", async () => {
			const mockFlight = { id: "1", flight_number: "FL001", status: "landed" };

			(Flight.findByPk as any).mockResolvedValue(mockFlight);

			const result = await FlightPerformanceRepository.findFlightById("1");

			expect(result).toEqual(mockFlight);
			expect(Flight.findByPk).toHaveBeenCalledWith("1");
		});

		it("should return null when flight not found", async () => {
			(Flight.findByPk as any).mockResolvedValue(null);

			const result =
				await FlightPerformanceRepository.findFlightById("invalid-id");

			expect(result).toBeNull();
		});

		it("should handle database error", async () => {
			const error = new Error("Database error");
			(Flight.findByPk as any).mockRejectedValue(error);

			await expect(
				FlightPerformanceRepository.findFlightById("1"),
			).rejects.toThrow("Database error");
		});
	});

	describe("findByFlightId", () => {
		it("should find performance by flight id successfully", async () => {
			const mockPerformance = {
				id: "1",
				flight_id: "1",
				fuel_efficiency: 2.5,
				load_factor_pct: 85.5,
			};

			(FlightPerformance.findOne as any).mockResolvedValue(mockPerformance);

			const result = await FlightPerformanceRepository.findByFlightId("1");

			expect(result).toEqual(mockPerformance);
			expect(FlightPerformance.findOne).toHaveBeenCalledWith(
				expect.objectContaining({
					where: { flight_id: "1" },
				}),
			);
		});

		it("should return null when performance not found", async () => {
			(FlightPerformance.findOne as any).mockResolvedValue(null);

			const result =
				await FlightPerformanceRepository.findByFlightId("invalid-id");

			expect(result).toBeNull();
		});

		it("should handle database error", async () => {
			const error = new Error("Query failed");
			(FlightPerformance.findOne as any).mockRejectedValue(error);

			await expect(
				FlightPerformanceRepository.findByFlightId("1"),
			).rejects.toThrow("Query failed");
		});
	});

	describe("create", () => {
		it("should create flight performance successfully", async () => {
			const mockPerformance = {
				id: "1",
				flight_id: "1",
				fuel_used_kg: 8000,
				distance_km: 3200,
				fuel_efficiency: 2.5,
				load_factor_pct: 85.5,
				co2_emissions_kg: 25280,
				average_speed: 450.35,
			};

			const data = {
				flight_id: "1",
				fuel_used_kg: 8000,
				distance_km: 3200,
				passengers_count: 154,
				payload_kg: 15000,
				flight_time_minutes: 427,
				fuel_efficiency: 2.5,
				load_factor_pct: 85.5,
				co2_emissions_kg: 25280,
				average_speed: 450.35,
			};

			(FlightPerformance.create as any).mockResolvedValue(mockPerformance);

			const result = await FlightPerformanceRepository.create(data);

			expect(result).toEqual(mockPerformance);
			expect(FlightPerformance.create).toHaveBeenCalledWith(data);
		});

		it("should handle create error", async () => {
			const error = new Error("Create failed");
			(FlightPerformance.create as any).mockRejectedValue(error);

			await expect(FlightPerformanceRepository.create({})).rejects.toThrow(
				"Create failed",
			);
		});
	});

	describe("findAll", () => {
		it("should get all flight performance data successfully", async () => {
			const mockPerformances = [
				{
					id: "1",
					flight_id: "1",
					fuel_efficiency: 2.5,
					load_factor_pct: 85.5,
				},
				{
					id: "2",
					flight_id: "2",
					fuel_efficiency: 2.3,
					load_factor_pct: 78.2,
				},
			];

			(FlightPerformance.findAll as any).mockResolvedValue(mockPerformances);

			const result = await FlightPerformanceRepository.findAll();

			expect(result).toEqual(mockPerformances);
			expect(FlightPerformance.findAll).toHaveBeenCalledWith(
				expect.objectContaining({
					order: expect.any(Array),
				}),
			);
		});

		it("should return empty array when no performance data", async () => {
			(FlightPerformance.findAll as any).mockResolvedValue([]);

			const result = await FlightPerformanceRepository.findAll();

			expect(result).toEqual([]);
		});

		it("should sort by createdAt in descending order", async () => {
			(FlightPerformance.findAll as any).mockResolvedValue([]);

			await FlightPerformanceRepository.findAll();

			expect(FlightPerformance.findAll).toHaveBeenCalledWith(
				expect.objectContaining({
					order: [["createdAt", "DESC"]],
				}),
			);
		});

		it("should handle database error when fetching all", async () => {
			const error = new Error("Database error");
			(FlightPerformance.findAll as any).mockRejectedValue(error);

			await expect(FlightPerformanceRepository.findAll()).rejects.toThrow(
				"Database error",
			);
		});
	});
});
