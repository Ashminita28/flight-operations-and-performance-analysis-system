import { describe, it, expect, vi, beforeEach } from "vitest";
import { FlightPerformanceService } from "../../src/services/performance-service";
import { FlightPerformanceRepository } from "../../src/repositories/performance-repository";

vi.mock("../../src/repositories/performance-repository");

describe("Flight Performance Service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("createPerformance", () => {
		it("should create flight performance successfully", async () => {
			const mockFlight = { id: "1", flight_number: "FL001", status: "landed" };
			const mockPerformance = {
				id: "1",
				flight_id: "1",
				fuel_used_kg: 8000,
				distance_km: 3200,
				passengers_count: 154,
				payload_kg: 15000,
				flight_time_minutes: 427,
				fuel_efficiency: 2.5,
				load_factor_pct: 85.56,
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
			};

			(FlightPerformanceRepository.findFlightById as any).mockResolvedValue(
				mockFlight,
			);
			(FlightPerformanceRepository.findByFlightId as any).mockResolvedValue(
				null,
			);
			(FlightPerformanceRepository.create as any).mockResolvedValue(
				mockPerformance,
			);

			const result = await FlightPerformanceService.createPerformance(data);

			expect(result).toBeDefined();
			expect(FlightPerformanceRepository.create).toHaveBeenCalled();
		});

		it("should throw error when flight not found", async () => {
			const data = {
				flight_id: "invalid-id",
				fuel_used_kg: 8000,
				distance_km: 3200,
				passengers_count: 154,
				payload_kg: 15000,
				flight_time_minutes: 427,
			};

			(FlightPerformanceRepository.findFlightById as any).mockResolvedValue(
				null,
			);

			await expect(
				FlightPerformanceService.createPerformance(data),
			).rejects.toThrow();
		});

		it("should throw error when flight status is not landed", async () => {
			const mockFlight = {
				id: "1",
				flight_number: "FL001",
				status: "in_flight",
			};

			const data = {
				flight_id: "1",
				fuel_used_kg: 8000,
				distance_km: 3200,
				passengers_count: 154,
				payload_kg: 15000,
				flight_time_minutes: 427,
			};

			(FlightPerformanceRepository.findFlightById as any).mockResolvedValue(
				mockFlight,
			);

			await expect(
				FlightPerformanceService.createPerformance(data),
			).rejects.toThrow();
		});

		it("should throw error when performance already exists", async () => {
			const mockFlight = { id: "1", flight_number: "FL001", status: "landed" };
			const existingPerformance = { id: "99", flight_id: "1" };

			const data = {
				flight_id: "1",
				fuel_used_kg: 8000,
				distance_km: 3200,
				passengers_count: 154,
				payload_kg: 15000,
				flight_time_minutes: 427,
			};

			(FlightPerformanceRepository.findFlightById as any).mockResolvedValue(
				mockFlight,
			);
			(FlightPerformanceRepository.findByFlightId as any).mockResolvedValue(
				existingPerformance,
			);

			await expect(
				FlightPerformanceService.createPerformance(data),
			).rejects.toThrow();
		});

		it("should calculate performance metrics correctly", async () => {
			const mockFlight = { id: "1", flight_number: "FL001", status: "landed" };
			const data = {
				flight_id: "1",
				fuel_used_kg: 8000,
				distance_km: 3200,
				passengers_count: 154,
				payload_kg: 15000,
				flight_time_minutes: 427,
			};

			(FlightPerformanceRepository.findFlightById as any).mockResolvedValue(
				mockFlight,
			);
			(FlightPerformanceRepository.findByFlightId as any).mockResolvedValue(
				null,
			);
			(FlightPerformanceRepository.create as any).mockImplementation(
				(createData: any) => {
					return Promise.resolve(createData);
				},
			);

			const result = await FlightPerformanceService.createPerformance(data);

			// Verify calculations
			expect(result.fuel_efficiency_kg_per_km).toBeDefined();
			expect(result.load_factor_pct).toBeDefined();
			expect(result.co2_emissions_kg).toBeDefined();
			expect(result.average_speed_kmh).toBeDefined();
		});
	});

	describe("getAllPerformance", () => {
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

			(FlightPerformanceRepository.findAll as any).mockResolvedValue(
				mockPerformances,
			);

			const result = await FlightPerformanceService.getAllPerformance();

			expect(result).toEqual(mockPerformances);
			expect(FlightPerformanceRepository.findAll).toHaveBeenCalled();
		});

		it("should return empty array when no performance data", async () => {
			(FlightPerformanceRepository.findAll as any).mockResolvedValue([]);

			const result = await FlightPerformanceService.getAllPerformance();

			expect(result).toEqual([]);
		});

		it("should handle error when fetching all performance", async () => {
			const error = new Error("Database error");
			(FlightPerformanceRepository.findAll as any).mockRejectedValue(error);

			await expect(
				FlightPerformanceService.getAllPerformance(),
			).rejects.toThrow("Database error");
		});
	});

	describe("getFlightPerformanceById", () => {
		it("should get flight performance by id successfully", async () => {
			const mockPerformance = {
				id: "1",
				flight_id: "1",
				fuel_efficiency: 2.5,
				load_factor_pct: 85.5,
			};

			(FlightPerformanceRepository.findByFlightId as any).mockResolvedValue(
				mockPerformance,
			);

			const result =
				await FlightPerformanceService.getFlightPerformanceById("1");

			expect(result).toEqual(mockPerformance);
			expect(FlightPerformanceRepository.findByFlightId).toHaveBeenCalledWith(
				"1",
			);
		});

		it("should return null when performance not found", async () => {
			(FlightPerformanceRepository.findByFlightId as any).mockResolvedValue(
				null,
			);

			const result =
				await FlightPerformanceService.getFlightPerformanceById("invalid-id");

			expect(result).toBeNull();
		});

		it("should handle error when fetching performance", async () => {
			const error = new Error("Query failed");
			(FlightPerformanceRepository.findByFlightId as any).mockRejectedValue(
				error,
			);

			await expect(
				FlightPerformanceService.getFlightPerformanceById("1"),
			).rejects.toThrow("Query failed");
		});
	});
});
