import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response, NextFunction } from "express";
import * as controller from "../../src/controllers/flight-controller";
import * as service from "../../src/services/flight-service";

vi.mock("../../src/services/flight-service");

describe("Flight Controller", () => {
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

	describe("createFlightController", () => {
		it("should create flight successfully", async () => {
			const mockFlight = {
				id: "1",
				flight_number: "FL001",
				aircraft_id: "1",
				origin_airport: "NYC",
				destination_airport: "LAX",
			};

			req.body = {
				flight_number: "FL001",
				aircraft_id: "1",
				origin_airport: "NYC",
				destination_airport: "LAX",
				scheduled_departure: "2025-04-01T10:00:00Z",
				scheduled_arrival: "2025-04-01T13:00:00Z",
				flight_date: "2025-04-01",
			};

			(service.createFlightService as any).mockResolvedValue(mockFlight);

			await controller.createFlightController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockFlight,
			});
		});

		it("should handle validation error", async () => {
			req.body = { flight_number: "FL001" };
			const error = new Error("Validation failed");

			(service.createFlightService as any).mockRejectedValue(error);

			await controller.createFlightController(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("getAllFlightsController", () => {
		it("should get all flights successfully", async () => {
			const mockResult = {
				flights: [
					{ id: "1", flight_number: "FL001" },
					{ id: "2", flight_number: "FL002" },
				],
				pagination: { total: 2, page: 1, limit: 20, total_pages: 1 },
			};

			(service.getAllFlights as any).mockResolvedValue(mockResult);

			await controller.getAllFlightsController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockResult.flights,
				pagination: mockResult.pagination,
			});
		});

		it("should handle error when fetching flights", async () => {
			const error = new Error("Database error");
			(service.getAllFlights as any).mockRejectedValue(error);

			await controller.getAllFlightsController(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("getFlightByIdController", () => {
		it("should get flight by id successfully", async () => {
			const mockFlight = { id: "1", flight_number: "FL001" };
			req.params = { id: "1" };

			(service.getFlightById as any).mockResolvedValue(mockFlight);

			await controller.getFlightByIdController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockFlight,
			});
		});

		it("should handle error when flight not found", async () => {
			req.params = { id: "invalid-id" };
			const error = new Error("Flight not found");

			(service.getFlightById as any).mockRejectedValue(error);

			await controller.getFlightByIdController(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("updateFlightByIdController", () => {
		it("should update flight successfully", async () => {
			const mockFlight = { id: "1", flight_number: "FL001", status: "delayed" };
			req.params = { id: "1" };
			req.body = { status: "delayed" };

			(service.updateFlight as any).mockResolvedValue(mockFlight);

			await controller.updateFlightByIdController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockFlight,
			});
		});

		it("should handle update error", async () => {
			req.params = { id: "1" };
			req.body = { status: "delayed" };
			const error = new Error("Update failed");

			(service.updateFlight as any).mockRejectedValue(error);

			await controller.updateFlightByIdController(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("deleteFlightById", () => {
		it("should delete flight successfully", async () => {
			req.params = { id: "1" };

			(service.deleteFlight as any).mockResolvedValue(true);

			await controller.deleteFlightById(req as Request, res as Response, next);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				message: "Flight deleted successfully",
			});
		});

		it("should return 400 when id is missing", async () => {
			req.params = {};

			await controller.deleteFlightById(req as Request, res as Response, next);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it("should handle delete error", async () => {
			req.params = { id: "1" };
			const error = new Error("Delete failed");

			(service.deleteFlight as any).mockRejectedValue(error);

			await controller.deleteFlightById(req as Request, res as Response, next);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("getTodaysFlightUpdates", () => {
		it("should get today's flights successfully", async () => {
			const mockFlights = [
				{ id: "1", flight_number: "FL001", flight_date: "2025-03-12" },
			];

			(service.getTodaysFlights as any).mockResolvedValue(mockFlights);

			await controller.getTodaysFlightUpdates(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockFlights,
			});
		});

		it("should handle error when fetching today's flights", async () => {
			const error = new Error("Query failed");
			(service.getTodaysFlights as any).mockRejectedValue(error);

			await controller.getTodaysFlightUpdates(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("changeFlightStatusByIdController", () => {
		it("should change flight status successfully", async () => {
			const mockFlight = {
				id: "1",
				flight_number: "FL001",
				status: "completed",
			};
			req.params = { id: "1" };
			req.body = { status: "completed" };

			(service.updateFlightStatusService as any).mockResolvedValue(mockFlight);

			await controller.changeFlightStatusByIdController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockFlight,
			});
		});

		it("should handle status change error", async () => {
			req.params = { id: "1" };
			req.body = { status: "invalid" };
			const error = new Error("Invalid status transition");

			(service.updateFlightStatusService as any).mockRejectedValue(error);

			await controller.changeFlightStatusByIdController(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});
});
