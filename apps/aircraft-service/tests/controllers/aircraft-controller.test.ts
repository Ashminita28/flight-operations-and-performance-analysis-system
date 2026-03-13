import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response, NextFunction } from "express";
import * as controller from "../../src/controllers/aircraft-controller";
import * as service from "../../src/services/aircraft-service";

vi.mock("../../src/services/aircraft-service");

describe("Aircraft Controller", () => {
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

	describe("createAircraftController", () => {
		it("should create aircraft successfully", async () => {
			const mockAircraft = {
				id: "1",
				registration: "N12345",
				manufacturer: "Boeing",
				model: "737",
				status: "active",
			};

			req.body = {
				registration: "N12345",
				icao_type: "B737",
				manufacturer: "Boeing",
				model: "737",
				seat_capacity: 180,
				fuel_capacity_kg: 68000,
				max_payload_kg: 30000,
				year_of_manufacture: 2020,
				status: "active",
				base_airport_code: "NYC",
				notes: "Test aircraft",
			};

			(service.createAircraft as any).mockResolvedValue(mockAircraft);

			await controller.createAircraftController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockAircraft,
			});
			expect(service.createAircraft).toHaveBeenCalledWith(expect.any(Object));
		});

		it("should handle error when creating aircraft", async () => {
			req.body = { registration: "N12345" };
			const error = new Error("Database error");

			(service.createAircraft as any).mockRejectedValue(error);

			await controller.createAircraftController(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("getAllAircraftController", () => {
		it("should get all aircraft successfully", async () => {
			const mockAircraft = [
				{ id: "1", registration: "N12345" },
				{ id: "2", registration: "N67890" },
			];

			(service.getAllAircraft as any).mockResolvedValue(mockAircraft);

			await controller.getAllAircraftController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockAircraft,
			});
		});

		it("should handle error when fetching aircraft", async () => {
			const error = new Error("Database connection failed");
			(service.getAllAircraft as any).mockRejectedValue(error);

			await controller.getAllAircraftController(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("getAircraftByIdController", () => {
		it("should get aircraft by id successfully", async () => {
			const mockAircraft = { id: "1", registration: "N12345" };
			req.params = { id: "1" };

			(service.getAircraftById as any).mockResolvedValue(mockAircraft);

			await controller.getAircraftByIdController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockAircraft,
			});
		});

		it("should return 400 when id is missing", async () => {
			req.params = {};

			await controller.getAircraftByIdController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it("should handle error when aircraft not found", async () => {
			req.params = { id: "invalid-id" };
			const error = new Error("Aircraft not found");

			(service.getAircraftById as any).mockRejectedValue(error);

			await controller.getAircraftByIdController(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("updateAircraftByIdController", () => {
		it("should update aircraft successfully", async () => {
			const mockAircraft = {
				id: "1",
				registration: "N12345",
				status: "inactive",
			};
			req.params = { id: "1" };
			req.body = { status: "inactive" };

			(service.updateAircraft as any).mockResolvedValue(mockAircraft);

			await controller.updateAircraftByIdController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockAircraft,
			});
		});

		it("should handle update error", async () => {
			req.params = { id: "1" };
			req.body = { status: "inactive" };
			const error = new Error("Update failed");

			(service.updateAircraft as any).mockRejectedValue(error);

			await controller.updateAircraftByIdController(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("changeAircraftStatusController", () => {
		it("should change aircraft status successfully", async () => {
			const mockAircraft = { id: "1", status: "maintenance" };
			req.params = { id: "1" };
			req.body = { status: "maintenance" };

			(service.changeAircraftStatus as any).mockResolvedValue(mockAircraft);

			await controller.changeAircraftStatusController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockAircraft,
			});
		});

		it("should return 400 when status is missing", async () => {
			req.params = { id: "1" };
			req.body = {};

			await controller.changeAircraftStatusController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it("should handle status change error", async () => {
			req.params = { id: "1" };
			req.body = { status: "invalid" };
			const error = new Error("Invalid status");

			(service.changeAircraftStatus as any).mockRejectedValue(error);

			await controller.changeAircraftStatusController(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("deleteAircraftByIdController", () => {
		it("should delete aircraft successfully", async () => {
			req.params = { id: "1" };

			(service.deleteAircraft as any).mockResolvedValue(true);

			await controller.deleteAircraftByIdController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				message: "Aircraft deleted successfully",
			});
		});

		it("should handle delete error", async () => {
			req.params = { id: "invalid-id" };
			const error = new Error("Aircraft not found");

			(service.deleteAircraft as any).mockRejectedValue(error);

			await controller.deleteAircraftByIdController(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("getAvailableAircraftByDateController", () => {
		it("should get available aircraft by date successfully", async () => {
			const mockAircraft = [{ id: "1", registration: "N12345" }];
			req.query = { date: "2025-03-12" };

			(service.getAircraftOnDate as any).mockResolvedValue(mockAircraft);

			await controller.getAvailableAircraftByDateController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockAircraft,
			});
		});

		it("should return 400 when date is missing", async () => {
			req.query = {};

			await controller.getAvailableAircraftByDateController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(400);
		});

		it("should handle error when fetching available aircraft", async () => {
			req.query = { date: "2025-03-12" };
			const error = new Error("Query failed");

			(service.getAircraftOnDate as any).mockRejectedValue(error);

			await controller.getAvailableAircraftByDateController(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("getAllAirportsController", () => {
		it("should get all airports successfully", async () => {
			const mockAirports = [
				{ id: "1", code: "NYC", name: "New York" },
				{ id: "2", code: "LAX", name: "Los Angeles" },
			];

			(service.getAllAirports as any).mockResolvedValue(mockAirports);

			await controller.getAllAirportsController(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockAirports,
			});
		});

		it("should handle error when fetching airports", async () => {
			const error = new Error("Database error");
			(service.getAllAirports as any).mockRejectedValue(error);

			await controller.getAllAirportsController(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});
});
