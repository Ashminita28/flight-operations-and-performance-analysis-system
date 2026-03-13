import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response, NextFunction } from "express";
import { FlightPerformanceController } from "../../src/controller/performance-controller";
import { FlightPerformanceService } from "../../src/services/performance-service";

vi.mock("../../src/services/performance-service");

describe("Performance Controller", () => {
	let req: Partial<Request>;
	let res: Partial<Response>;
	let next: NextFunction;

	beforeEach(() => {
		req = {
			body: {},
			params: {},
			query: {},
		};
		res = {
			status: vi.fn().mockReturnThis(),
			json: vi.fn().mockReturnThis(),
		};
		next = vi.fn();
		vi.clearAllMocks();
	});

	describe("create", () => {
		it("should create flight performance successfully", async () => {
			const mockPerformance = {
				id: "1",
				flight_id: "1",
				fuel_efficiency: 2.5,
				load_factor_pct: 85.5,
				co2_emissions_kg: 8960,
				average_speed: 450.0,
			};

			req.params = { flightId: "1" };
			req.body = {
				fuel_used_kg: 8000,
				distance_km: 3200,
				passengers_count: 154,
				payload_kg: 15000,
				flight_time_minutes: 427,
			};

			(FlightPerformanceService.createPerformance as any).mockResolvedValue(
				mockPerformance,
			);

			await FlightPerformanceController.create(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				message: "Flight performance recorded successfully",
				data: mockPerformance,
			});
		});

		it("should handle validation error", async () => {
			req.params = { flightId: "1" };
			req.body = { fuel_used_kg: -100 };

			const error = new Error("Validation failed");
			(FlightPerformanceService.createPerformance as any).mockRejectedValue(
				error,
			);

			await FlightPerformanceController.create(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});

		it("should handle flight not found error", async () => {
			req.params = { flightId: "invalid-id" };
			req.body = {
				fuel_used_kg: 8000,
				distance_km: 3200,
				passengers_count: 154,
				payload_kg: 15000,
				flight_time_minutes: 427,
			};

			const error = new Error("Flight not found");
			(FlightPerformanceService.createPerformance as any).mockRejectedValue(
				error,
			);

			await FlightPerformanceController.create(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("getAll", () => {
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

			(FlightPerformanceService.getAllPerformance as any).mockResolvedValue(
				mockPerformances,
			);

			await FlightPerformanceController.getAll(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockPerformances,
			});
		});

		it("should return empty array when no performance data", async () => {
			(FlightPerformanceService.getAllPerformance as any).mockResolvedValue([]);

			await FlightPerformanceController.getAll(
				req as Request,
				res as Response,
				next,
			);

			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: [],
			});
		});

		it("should handle error when fetching all performance data", async () => {
			const error = new Error("Database error");
			(FlightPerformanceService.getAllPerformance as any).mockRejectedValue(
				error,
			);

			await FlightPerformanceController.getAll(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("geFlightPerformance", () => {
		it("should get flight performance by id successfully", async () => {
			const mockPerformance = {
				id: "1",
				flight_id: "1",
				fuel_efficiency: 2.5,
				load_factor_pct: 85.5,
			};

			req.params = { flight_id: "1" };

			(
				FlightPerformanceService.getFlightPerformanceById as any
			).mockResolvedValue(mockPerformance);

			await FlightPerformanceController.geFlightPerformance(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockPerformance,
			});
		});

		it("should return null when performance not found", async () => {
			req.params = { flight_id: "invalid-id" };

			(
				FlightPerformanceService.getFlightPerformanceById as any
			).mockResolvedValue(null);

			await FlightPerformanceController.geFlightPerformance(
				req as Request,
				res as Response,
				next,
			);

			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: null,
			});
		});

		it("should handle error when fetching flight performance", async () => {
			req.params = { flight_id: "1" };
			const error = new Error("Query failed");

			(
				FlightPerformanceService.getFlightPerformanceById as any
			).mockRejectedValue(error);

			await FlightPerformanceController.geFlightPerformance(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});
});
